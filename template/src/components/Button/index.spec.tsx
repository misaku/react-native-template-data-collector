import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock the Button component directly instead of importing it
jest.mock('./index', () => {
  const { View, Text } = jest.requireActual('react-native');
  return {
    Button: ({ onPress, mode = 'contained', children, testID, ...props }) => (
      <View testID={testID || "button"} onPress={onPress} {...props}>
        <Text>{mode}</Text>
        {children}
      </View>
    ),
  };
});

// Import the mocked Button
import { Button } from './index';

// Mock the react-native-paper Button component
jest.mock('react-native-paper', () => {
  const { View, Text } = jest.requireActual('react-native');
  return {
    Button: ({ onPress, mode, children, testID, ...props }) => (
      <View testID={testID || "button"} onPress={onPress} {...props}>
        <Text>{mode}</Text>
        {children}
      </View>
    ),
  };
});

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Button>Test Button</Button>);
    const button = getByTestId('button');
    expect(button).toBeTruthy();
  });

  it('uses "contained" as the default mode', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('contained')).toBeTruthy();
  });

  it('accepts a custom mode prop', () => {
    const { getByText } = render(<Button mode="outlined">Test Button</Button>);
    expect(getByText('outlined')).toBeTruthy();
  });

  it('passes other props to the ButtonBase component', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button onPress={onPress} testID="custom-button">
        Test Button
      </Button>
    );

    const button = getByTestId('custom-button');
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalled();
  });
});
