import {act, render, waitFor} from '@testing-library/react-native';
import {Text} from 'react-native';
import React from 'react';
import {useBroadcast} from 'react-native-rodney-broadcast';
import {EventEmitter} from 'events';
import {CollectorScanner} from './collector-scanner.view';

jest.mock('react-native-rodney-broadcast', () => ({
  __esModule: true,
  useBroadcast: jest.fn(),
}));

// Mock the styled components
jest.mock('./collector-scanner.styles', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    Wrapper: ({children, hasMany, ...props}) => (
      <View testID="collector-scanner" {...props}>
        {children}
      </View>
    ),
    WrapperImage: ({children, hasMany, ...props}) => (
      <View testID="wrapper-image" {...props}>
        {children}
      </View>
    ),
    WrapperText: ({children, hasMany, ...props}) => (
      <View testID="wrapper-text" {...props}>
        {children}
      </View>
    ),
  };
});

jest.mock('../../../../App/app.store', () => ({
  __esModule: true,
  useAppStore: jest.fn(() => ({
    config: {
      colors: {
        primary: '#000000',
        background: '#FFFFFF',
        border: '#CCCCCC'
      }
    },
    getData: (value: any) => value,
  })),
}));

describe('CollectorScanner Component', () => {
  let eventEmitter: EventEmitter;
  const mockOnBarcodeReader = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    eventEmitter = new EventEmitter();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.clearAllTimers();
    eventEmitter?.removeAllListeners();
    jest.useRealTimers();
  });
  it('should render ', () => {
    const {getByTestId} = render(
      <CollectorScanner onBarcodeReader={mockOnBarcodeReader} />,
    );
    expect(getByTestId('collector-scanner')).toBeTruthy();
  });

  it('should render with Children', () => {
    const {getByTestId} = render(
      <CollectorScanner onBarcodeReader={mockOnBarcodeReader}>
        <Text testID="test-render">test</Text>
      </CollectorScanner>,
    );
    expect(getByTestId('collector-scanner')).toBeTruthy();
    expect(getByTestId('test-render')).toBeTruthy();
  });

  it('should render with Children and HasMany', async () => {
    (useBroadcast as jest.Mock).mockImplementation(({fn}) => {
      eventEmitter.on('on_readerData', () => {
        fn('12345');
      });
    });
    const {getByTestId} = render(
      <CollectorScanner onBarcodeReader={mockOnBarcodeReader} hasMany>
        <Text testID="test-render">test</Text>
      </CollectorScanner>,
    );
    await act(async () => {
      eventEmitter.emit('on_readerData');
      await waitFor(() => expect(mockOnBarcodeReader).toHaveBeenCalled());
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      eventEmitter.off('on_readerData', () => {});
    });
    expect(getByTestId('collector-scanner')).toBeTruthy();
    expect(getByTestId('test-render')).toBeTruthy();
  });

  it('should render with Children and HasMany barcode', () => {
    const {getByTestId} = render(
      <CollectorScanner
        onBarcodeReader={mockOnBarcodeReader}
        typeScanner="barcode"
        hasMany>
        <Text testID="test-render">test</Text>
      </CollectorScanner>,
    );
    expect(getByTestId('collector-scanner')).toBeTruthy();
    expect(getByTestId('test-render')).toBeTruthy();
  });

  it('should render with Children and  qrcode', () => {
    const {getByTestId} = render(
      <CollectorScanner
        onBarcodeReader={mockOnBarcodeReader}
        typeScanner="qrcode">
        <Text testID="test-render">test</Text>
      </CollectorScanner>,
    );
    expect(getByTestId('collector-scanner')).toBeTruthy();
    expect(getByTestId('test-render')).toBeTruthy();
  });

  it('should render with Children and HasMany both', () => {
    const {getByTestId} = render(
      <CollectorScanner
        onBarcodeReader={mockOnBarcodeReader}
        typeScanner="both"
        hasMany>
        <Text testID="test-render">test</Text>
      </CollectorScanner>,
    );
    expect(getByTestId('collector-scanner')).toBeTruthy();
    expect(getByTestId('test-render')).toBeTruthy();
  });
});
