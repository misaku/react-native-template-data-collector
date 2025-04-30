import {act, renderHook, waitFor} from '@testing-library/react-native';
import {useBroadcast} from 'react-native-rodney-broadcast';
import {EventEmitter} from 'events';
import {useCollectorScanner} from './collector-scanner.controller';

jest.mock('react-native-rodney-broadcast', () => ({
  __esModule: true,
  useBroadcast: jest.fn(),
}));

jest.mock('../../../../App/app.store', () => ({
  __esModule: true,
  useAppStore: jest.fn(() => ({
    config: {},
    getData: (value: any) => value,
  })),
}));

describe('CollectorScanner Hook', () => {
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

  it('should render hook', async () => {
    (useBroadcast as jest.Mock).mockImplementation(({fn}) => {
      eventEmitter.on('on_readerData', () => {
        fn('12345');
      });
    });
    const {result} = renderHook(() =>
      useCollectorScanner({onBarcodeReader: mockOnBarcodeReader}),
    );
    await act(async () => {
      eventEmitter.emit('on_readerData');
      await waitFor(() => expect(mockOnBarcodeReader).toHaveBeenCalled());
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      eventEmitter.off('on_readerData', () => {});
    });
    expect(result.current.sourceLottie).toBeTruthy();
  });
});
