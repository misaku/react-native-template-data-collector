import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {render, waitFor} from '@testing-library/react-native';
// eslint-disable-next-line import/no-unresolved
import {Text, View} from 'react-native';
import {CamScanner} from './cam-scanner.view';
import {useCamScanner} from './cam-scanner.controller';

// Mock the react-native-orientation-locker
jest.mock('react-native-orientation-locker', () => ({
  __esModule: true,
  default: {
    lockToLandscape: jest.fn(),
    lockToPortrait: jest.fn(),
    unlockAllOrientations: jest.fn()
  },
  useDeviceOrientationChange: jest.fn(),
  LANDSCAPE: 'LANDSCAPE',
  LANDSCAPE_LEFT: 'LANDSCAPE_LEFT',
  LANDSCAPE_RIGHT: 'LANDSCAPE_RIGHT',
}));

// Mock the config store
jest.mock('@config/config.store', () => {
  const actual = jest.requireActual('@config/config.constants');
  return {
    useConfigStore: () => ({
      config: {
        colors: {
          primary: '#000000',
          black: 'rgba(0,0,0,0.5)',
        },
        measures: {
          radius: 5,
        },
        permissons: {
          camera: {
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          },
          recordAudio: {
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          },
        },
      }
    }),
  };
});

// Mock the cam-scanner controller
jest.mock('./cam-scanner.controller', () => ({
  useCamScanner: jest.fn(),
}));

// Mock the RNCamera
jest.mock('react-native-camera', () => {
  const React = require('react');
  const {View} = require('react-native');

  class RNCameraMock extends React.Component {
    static Constants = {
      Type: {
        back: 'back',
      },
      FlashMode: {
        on: 'on',
      },
      AutoFocus: {
        on: 'on',
      },
    };

    render() {
      return <View testID="rn-camera" {...this.props} />;
    }
  }

  return {
    RNCamera: RNCameraMock,
  };
});

// Mock the barcode mask
jest.mock('@nartc/react-native-barcode-mask', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    BarcodeMaskWithOuterLayout: props => (
      <View testID="barcode-mask" {...props} />
    ),
  };
});

// Mock the styled components
jest.mock('./cam-scanner.styles', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    CameraView: React.forwardRef((props, ref) => (
      <View ref={ref} testID="camera-view" {...props} />
    )),
    Container: ({children, multiple, testID, ...props}) => (
      <View testID={testID} data-multiple={multiple} {...props}>
        {children}
      </View>
    ),
    WrapperCamera: ({children, testID, ...props}) => (
      <View testID={testID} {...props}>
        {children}
      </View>
    ),
    WrapText: ({children, ...props}) => (
      <View testID="wrap-text" {...props}>
        {children}
      </View>
    ),
  };
});

describe('CamScanner Component', () => {
  const mockOnBarcodeReader = jest.fn();
  const mockSetIsReadyTrue = jest.fn();
  const mockOnBarcodeReaderData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementation for useCamScanner
    (useCamScanner as jest.Mock).mockReturnValue({
      camera: { current: {} },
      setIsReadyTrue: mockSetIsReadyTrue,
      maskProps: { width: '80%', height: '80%' },
      config: {
        colors: {
          primary: '#000000',
          black: 'rgba(0,0,0,0.5)',
        },
        measures: {
          radius: 5,
        },
        permissons: {
          camera: {
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          },
          recordAudio: {
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          },
        },
      },
      onBarcodeReaderData: mockOnBarcodeReaderData,
      isMultiple: false,
    });
  });

  it('should render the camera and mask components when config is available', async () => {
    const {getByTestId} = render(
      <CamScanner zoom={0.5} onBarcodeReader={mockOnBarcodeReader} />,
    );

    // Verify that the main elements are rendered
    expect(getByTestId('containner-cam-scanner')).toBeTruthy();
    expect(getByTestId('camera-base')).toBeTruthy();
    expect(getByTestId('camera-view')).toBeTruthy();
    expect(getByTestId('barcode-mask')).toBeTruthy();

    // Verify that the camera props are passed correctly
    const cameraView = getByTestId('camera-view');
    expect(cameraView.props.zoom).toBe(0.5);
    expect(cameraView.props.onCameraReady).toBe(mockSetIsReadyTrue);
    expect(cameraView.props.onGoogleVisionBarcodesDetected).toBe(mockOnBarcodeReaderData);
  });

  it('should render the camera with children', async () => {
    const {getByTestId} = render(
      <CamScanner
        typeScanner="both"
        zoom={0.5}
        onBarcodeReader={mockOnBarcodeReader}
        hasMany>
        <Text testID="test-render">test</Text>
      </CamScanner>,
    );

    // Verify that the main elements are rendered
    expect(getByTestId('containner-cam-scanner')).toBeTruthy();
    expect(getByTestId('camera-base')).toBeTruthy();
    expect(getByTestId('test-render')).toBeTruthy();
    expect(getByTestId('wrap-text')).toBeTruthy();
  });

  it('should render with a custom testID', () => {
    const {getByTestId} = render(
      <CamScanner
        testID="custom-camera"
        zoom={0.5}
        onBarcodeReader={mockOnBarcodeReader}
      />,
    );

    expect(getByTestId('custom-camera')).toBeTruthy();
  });

  it('should render the list when isMultiple is true', () => {
    // Mock isMultiple to be true
    (useCamScanner as jest.Mock).mockReturnValue({
      camera: { current: {} },
      setIsReadyTrue: mockSetIsReadyTrue,
      maskProps: { width: '80%', height: '80%' },
      config: {
        colors: {
          primary: '#000000',
          black: 'rgba(0,0,0,0.5)',
        },
        measures: {
          radius: 5,
        },
        permissons: {
          camera: {
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          },
          recordAudio: {
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          },
        },
      },
      onBarcodeReaderData: mockOnBarcodeReaderData,
      isMultiple: true,
    });

    const {getByTestId} = render(
      <CamScanner
        zoom={0.5}
        onBarcodeReader={mockOnBarcodeReader}
        hasMany
        list={<View testID="list-component" />}
      />,
    );

    expect(getByTestId('list-component')).toBeTruthy();
  });

  it('should not render the list when isMultiple is false', () => {
    const {queryByTestId} = render(
      <CamScanner
        zoom={0.5}
        onBarcodeReader={mockOnBarcodeReader}
        list={<View testID="list-component" />}
      />,
    );

    expect(queryByTestId('list-component')).toBeNull();
  });

  it('should call useCamScanner with the correct props', () => {
    render(
      <CamScanner
        typeScanner="qrcode"
        zoom={0.5}
        onBarcodeReader={mockOnBarcodeReader}
        hasMany={true}
      />,
    );

    expect(useCamScanner).toHaveBeenCalledWith({
      typeScanner: 'qrcode',
      hasMany: true,
      onBarcodeReader: mockOnBarcodeReader,
    });
  });

  it('should not render children when children is not provided', () => {
    const {queryByTestId} = render(
      <CamScanner
        zoom={0.5}
        onBarcodeReader={mockOnBarcodeReader}
      />,
    );

    expect(queryByTestId('wrap-text')).toBeNull();
  });
});
