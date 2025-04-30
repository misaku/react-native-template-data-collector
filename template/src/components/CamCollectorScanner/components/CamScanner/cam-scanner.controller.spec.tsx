import {act, renderHook, waitFor} from '@testing-library/react-native';
import {EventEmitter} from 'events';
import {useDeviceOrientationChange} from 'react-native-orientation-locker';
import {useCamScanner} from './cam-scanner.controller';

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

jest.mock('@config/config.store', () => {
  const actual = jest.requireActual('@config/config.constants');
  return {
    useConfigStore: () => actual,
  };
});

describe('CamScanner Hook', () => {
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

  it('should call onBarcodeReaderData with barcodes when it detects barcodes', () => {
    const mockBarcodes = [{data: '12345'}, {data: '67890'}, {data: ''}];
    const {result} = renderHook(() =>
      useCamScanner({onBarcodeReader: mockOnBarcodeReader}),
    );
    act(() => {
      result.current.setIsReadyTrue();
      if (result.current.onBarcodeReaderData) {
        result.current.onBarcodeReaderData({barcodes: mockBarcodes});
      }
    });

    expect(mockOnBarcodeReader).toHaveBeenCalledTimes(1);
    expect(mockOnBarcodeReader).toHaveBeenCalledWith(mockBarcodes);
  });

  it('should call onBarcodeReaderData with barcodes when it detects barcodes no data', () => {
    const {result} = renderHook(() =>
      useCamScanner({onBarcodeReader: mockOnBarcodeReader}),
    );
    act(() => {
      result.current.setIsReadyTrue();
      if (result.current.onBarcodeReaderData) {
        result.current.onBarcodeReaderData({barcodes: []});
      }
    });

    expect(mockOnBarcodeReader).toHaveBeenCalledTimes(0);
  });

  it('should lock orientation to landscape when scanner type is barcode and isReady is true', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const OrientationMock = require('react-native-orientation-locker');

    const {result} = renderHook(() =>
      useCamScanner({
        typeScanner: 'barcode',
        onBarcodeReader: mockOnBarcodeReader,
      }),
    );

    act(() => {
      result.current.setIsReadyTrue();
    });

    expect(OrientationMock.default.lockToLandscape).toHaveBeenCalled();
  });

  it('should lock orientation to portrait when scanner type is qrcode and isReady is true', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const OrientationMock = require('react-native-orientation-locker');

    const {result} = renderHook(() =>
      useCamScanner({
        typeScanner: 'qrcode',
        onBarcodeReader: mockOnBarcodeReader,
      }),
    );

    act(() => {
      result.current.setIsReadyTrue();
    });

    expect(OrientationMock.default.lockToPortrait).toHaveBeenCalled();
  });

  it('should not lock orientation when isReady is false', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const OrientationMock = require('react-native-orientation-locker');

    renderHook(() =>
      useCamScanner({
        typeScanner: 'qrcode',
        onBarcodeReader: mockOnBarcodeReader,
      }),
    );

    expect(OrientationMock.default.lockToPortrait).not.toHaveBeenCalled();
    expect(OrientationMock.default.lockToLandscape).not.toHaveBeenCalled();
  });

  it('should unlock all orientations on cleanup', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const OrientationMock = require('react-native-orientation-locker');

    const {result, unmount} = renderHook(() =>
      useCamScanner({
        typeScanner: 'qrcode',
        onBarcodeReader: mockOnBarcodeReader,
      }),
    );

    act(() => {
      result.current.setIsReadyTrue();
    });

    expect(OrientationMock.default.lockToPortrait).toHaveBeenCalled();

    unmount();

    expect(OrientationMock.default.unlockAllOrientations).toHaveBeenCalled();
  });

  it('should handle multiple barcodes correctly when hasMany is true', () => {
    const mockBarcodes = [
      {data: 'barcode1'},
      {data: 'barcode2'},
      {data: 'barcode3'},
    ];
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        hasMany: true,
      }),
    );

    act(() => {
      result.current.onBarcodeReaderData({barcodes: mockBarcodes});
    });

    expect(mockOnBarcodeReader).toHaveBeenCalledTimes(1);
    expect(mockOnBarcodeReader).toHaveBeenCalledWith(mockBarcodes);
  });

  it('should return the correct values', async () => {
    const {result} = renderHook(() =>
      useCamScanner({onBarcodeReader: mockOnBarcodeReader}),
    );

    expect(result.current.camera).toBeTruthy();
    expect(result.current.isReady).toBeFalsy();
    expect(result.current.maskProps).toBeTruthy();
    expect(result.current.setIsReadyTrue).toBeTruthy();
    expect(result.current.config).toBeTruthy();
    expect(result.current.onBarcodeReaderData).toBeTruthy();

    await act(async () => {
      result.current.setIsReadyTrue();
      await waitFor(() => {
        expect(result.current.isReady).toBe(true);
      });
    });
  });

  it('should return the correct maskProps based on typeScanner and orientation', async () => {
    (useDeviceOrientationChange as jest.Mock).mockImplementation((callback) => {
      eventEmitter.on('change-orientation', () => {
        callback('LANDSCAPE');
      });
    });
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'both',
      }),
    );
    await act(async () => {
      eventEmitter.emit('change-orientation', 'LANDSCAPE');
      await waitFor(() =>
        expect(result.current.maskProps).toEqual({width: '90%', height: 100}),
      );
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      eventEmitter.off('change-orientation', () => {});
      expect(result.current.maskProps).toEqual({width: '90%', height: 100});
    });
  });

  it('should return the correct maskProps for qrcode scanner with isMultiple true', () => {
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'qrcode',
        hasMany: true,
      }),
    );

    expect(result.current.maskProps).toEqual({width: '90%', height: '80%'});
  });

  it('should return the correct maskProps for qrcode scanner with isMultiple false', () => {
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'qrcode',
        hasMany: false,
      }),
    );

    expect(result.current.maskProps).toEqual({});
  });

  it('should return the correct maskProps for both scanner with isMultiple true', () => {
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'both',
        hasMany: true,
      }),
    );

    expect(result.current.maskProps).toEqual({width: '80%', height: '80%'});
  });

  it('should return the correct maskProps for barcode scanner', () => {
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'barcode',
      }),
    );

    expect(result.current.maskProps).toEqual({width: '90%', height: 100});
  });

  it('should calculate isMultiple correctly for both scanner in landscape orientation', async () => {
    (useDeviceOrientationChange as jest.Mock).mockImplementation((callback) => {
      eventEmitter.on('change-orientation', () => {
        callback('LANDSCAPE');
      });
    });

    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'both',
        hasMany: true,
      }),
    );

    await act(async () => {
      eventEmitter.emit('change-orientation', 'LANDSCAPE');
      await waitFor(() => {
        expect(result.current.isMultiple).toBe(false);
      });
    });
  });

  it('should calculate isMultiple correctly for both scanner in portrait orientation', async () => {
    (useDeviceOrientationChange as jest.Mock).mockImplementation((callback) => {
      eventEmitter.on('change-orientation', () => {
        callback('PORTRAIT');
      });
    });

    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'both',
        hasMany: true,
      }),
    );

    await act(async () => {
      eventEmitter.emit('change-orientation', 'PORTRAIT');
      await waitFor(() => {
        expect(result.current.isMultiple).toBe(true);
      });
    });
  });

  it('should calculate isMultiple correctly for qrcode scanner', () => {
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'qrcode',
        hasMany: true,
      }),
    );

    expect(result.current.isMultiple).toBe(true);
  });

  it('should calculate isMultiple correctly for barcode scanner', () => {
    const {result} = renderHook(() =>
      useCamScanner({
        onBarcodeReader: mockOnBarcodeReader,
        typeScanner: 'barcode',
        hasMany: true,
      }),
    );

    expect(result.current.isMultiple).toBe(true);
  });
});
