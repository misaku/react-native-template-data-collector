import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Assign } from './assign.view';
import { useAssignController } from './assign.controller';

// Mock the controller hook
jest.mock('./assign.controller', () => ({
  useAssignController: jest.fn(),
}));

// Mock the AppLayout component
jest.mock('../../App/app.layout', () => ({
  AppLayout: ({ children }) => <>{children}</>,
}));

// Mock the styled components
jest.mock('./assign.styles', () => {
  const { View, Text } = require('react-native');
  return {
    Container: (props) => <View {...props} testID="container" />,
    Content: (props) => <View {...props} testID="content" />,
    Footer: (props) => <View {...props} testID="footer" />,
    Signature: (props) => <View {...props} testID="signature" />,
    SignatureBox: (props) => <View {...props} testID="signature-box" />,
    SignatureText: (props) => <Text {...props} testID="signature-text" />,
    SignedButtonLeft: ({ onPress, children }) => (
      <View testID="button-left" onPress={onPress}>
        {children}
      </View>
    ),
    SignedButtonRight: ({ onPress, children }) => (
      <View testID="button-right" onPress={onPress}>
        {children}
      </View>
    ),
  };
});

// Mock the config
jest.mock('@config/config.constants', () => ({
  config: {
    colors: {
      white: '#FFFFFF',
      primary: '#000000',
    },
  },
}));

describe('Assign Component', () => {
  const mockSaveSign = jest.fn();
  const mockResetSign = jest.fn();
  const mockOnSaveEvent = jest.fn();
  const mockSignatureRef = { current: null };
  const mockTextSignature = '01/01/2023';

  beforeEach(() => {
    jest.clearAllMocks();
    (useAssignController as jest.Mock).mockReturnValue({
      signatureRef: mockSignatureRef,
      textSignature: mockTextSignature,
      onSaveEvent: mockOnSaveEvent,
      saveSign: mockSaveSign,
      resetSign: mockResetSign,
    });
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Assign />);

    expect(getByTestId('container')).toBeTruthy();
    expect(getByTestId('content')).toBeTruthy();
    expect(getByTestId('signature-box')).toBeTruthy();
    expect(getByTestId('signature')).toBeTruthy();
    expect(getByTestId('signature-text')).toBeTruthy();
    expect(getByTestId('footer')).toBeTruthy();
    expect(getByTestId('button-left')).toBeTruthy();
    expect(getByTestId('button-right')).toBeTruthy();
  });

  it('displays the correct signature text', () => {
    const { getByTestId } = render(<Assign />);

    const signatureText = getByTestId('signature-text');
    expect(signatureText.props.children).toBe(mockTextSignature);
  });

  it('calls resetSign when the left button is pressed', () => {
    const { getByTestId } = render(<Assign />);

    const leftButton = getByTestId('button-left');
    fireEvent.press(leftButton);

    expect(mockResetSign).toHaveBeenCalled();
  });

  it('calls saveSign when the right button is pressed', () => {
    const { getByTestId } = render(<Assign />);

    const rightButton = getByTestId('button-right');
    fireEvent.press(rightButton);

    expect(mockSaveSign).toHaveBeenCalled();
  });

  it('passes the correct props to the Signature component', () => {
    const { getByTestId } = render(<Assign />);

    const signature = getByTestId('signature');

    // We can't directly test the ref prop
    expect(signature.props.onSaveEvent).toBe(mockOnSaveEvent);
    expect(signature.props.saveImageFileInExtStorage).toBe(false);
    expect(signature.props.showNativeButtons).toBe(false);
    expect(signature.props.showTitleLabel).toBe(false);
    expect(signature.props.backgroundColor).toBe('#FFFFFF');
    expect(signature.props.strokeColor).toBe('#000000');
    expect(signature.props.minStrokeWidth).toBe(4);
    expect(signature.props.maxStrokeWidth).toBe(4);
    expect(signature.props.viewMode).toBe('portrait');
  });
});
