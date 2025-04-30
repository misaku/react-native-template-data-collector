import React from 'react';
import {renderHook, act, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDevice} from 'react-native-device-info';
import {useApi} from '@hook/Api';
import {useAppController} from './app.controller';
import {parseJson} from './app.utils';
import {useAppStore} from './app.store';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  getDevice: jest.fn(),
}));

jest.mock('@hook/Api', () => ({
  useApi: jest.fn(),
}));

jest.mock('./app.utils', () => ({
  parseJson: jest.fn(),
}));

jest.mock('./app.store', () => ({
  useAppStore: jest.fn(),
}));

describe('useAppController', () => {
  const mockSetIsCollector = jest.fn();
  const mockApi = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockReturnValue({api: mockApi});
    (useAppStore as jest.Mock).mockReturnValue({
      setIsCollector: mockSetIsCollector,
    });
  });

  it('should initialize with visible set to false', () => {
    const {result} = renderHook(() => useAppController());
    expect(result.current.visible).toBe(false);
  });

  it('should hide dialog when hideDialog is called', () => {
    const {result} = renderHook(() => useAppController());

    act(() => {
      result.current.hideDialog();
    });

    expect(result.current.visible).toBe(false);
  });

  it('should set device as collector when setToCollector is called', async () => {
    const {result} = renderHook(() => useAppController());

    await act(async () => {
      await result.current.setToCollector();
    });

    expect(mockSetIsCollector).toHaveBeenCalledWith(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@HelloWorld/IsCollector',
      JSON.stringify({isCollector: true}),
    );
  });

  it('should set device as not collector when setToNotCollector is called', async () => {
    const {result} = renderHook(() => useAppController());

    await act(async () => {
      await result.current.setToNotCollector();
    });

    expect(mockSetIsCollector).toHaveBeenCalledWith(false);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@HelloWorld/IsCollector',
      JSON.stringify({isCollector: false}),
    );
  });

  it('should set collector status from AsyncStorage if available', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({isCollector: true}),
    );
    (parseJson as jest.Mock).mockReturnValue({isCollector: true});

    const {result} = renderHook(() => useAppController());

    await waitFor(() => {
      expect(mockSetIsCollector).toHaveBeenCalledWith(true);
    });
  });

  it('should make API call if collector status is not in AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (getDevice as jest.Mock).mockResolvedValue('DEVICE_MODEL');
    mockApi.get.mockResolvedValue({
      status: 200,
      data: {
        records: [{type: 'collector'}],
      },
    });

    const {result} = renderHook(() => useAppController());

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledWith('/devices/types', {
        params: {model: 'DEVICE_MODEL'},
      });
      expect(mockSetIsCollector).toHaveBeenCalledWith(true);
    });
  });

  it('should set device as not collector if API returns non-collector type', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (getDevice as jest.Mock).mockResolvedValue('DEVICE_MODEL');
    mockApi.get.mockResolvedValue({
      status: 200,
      data: {
        records: [{type: 'phone'}],
      },
    });

    const {result} = renderHook(() => useAppController());

    await waitFor(() => {
      expect(mockSetIsCollector).toHaveBeenCalledWith(false);
    });
  });

  it('should show dialog if API call fails', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (getDevice as jest.Mock).mockResolvedValue('DEVICE_MODEL');
    mockApi.get.mockRejectedValue(new Error('API Error'));

    const {result} = renderHook(() => useAppController());

    await waitFor(() => {
      expect(result.current.visible).toBe(true);
    });
  });

  it('should show dialog if API returns non-200 status', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (getDevice as jest.Mock).mockResolvedValue('DEVICE_MODEL');
    mockApi.get.mockResolvedValue({
      status: 404,
    });

    const {result} = renderHook(() => useAppController());

    await waitFor(() => {
      expect(result.current.visible).toBe(true);
    });
  });

  it('should handle error when getting data from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
      new Error('Storage Error'),
    );

    const {result} = renderHook(() => useAppController());

    // Should continue execution without error
    expect(AsyncStorage.getItem).toHaveBeenCalled();
  });

  it('should handle error when storing data to AsyncStorage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(
      new Error('Storage Error'),
    );

    const {result} = renderHook(() => useAppController());

    await act(async () => {
      await result.current.setToCollector();
    });

    // Should continue execution without error
    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(mockSetIsCollector).toHaveBeenCalledWith(true);
  });
});
