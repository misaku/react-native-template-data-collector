import {renderHook, act} from '@testing-library/react-native';
import {useDevModeContentController} from './dev-mode-content.controller';
import {makeListEvents} from './dev-mode-content.constants';

// Mock the useBroadcastSender hook
jest.mock('react-native-rodney-broadcast', () => ({
  useBroadcastSender: jest.fn(() => ({
    sendBroadcast: jest.fn(),
  })),
}));

// Mock the useAppStore hook
jest.mock('../../../../App/app.store', () => ({
  useAppStore: jest.fn(() => ({
    config: {
      actionNames: ['test-action'],
    },
  })),
}));

// Mock the makeListEvents function
jest.mock('./dev-mode-content.constants', () => ({
  makeListEvents: jest.fn(() => [
    {name: 'Event 1', action: jest.fn()},
    {name: 'Event 2', action: jest.fn()},
  ]),
}));

describe('useDevModeContentController Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the list of events', () => {
    const {result} = renderHook(() => useDevModeContentController());

    expect(result.current.listEvents).toEqual([
      {name: 'Event 1', action: expect.any(Function)},
      {name: 'Event 2', action: expect.any(Function)},
    ]);
  });

  it('calls makeListEvents with the simulateScan function', () => {
    renderHook(() => useDevModeContentController());

    expect(makeListEvents).toHaveBeenCalledWith(expect.any(Function));
  });
});
