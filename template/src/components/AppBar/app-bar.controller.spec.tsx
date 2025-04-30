import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { useAppBarController } from './app-bar.controller';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../../App/app.store';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../App/app.store', () => ({
  useAppStore: jest.fn(),
}));

// Mock package.json
jest.mock('../../../package.json', () => ({
  version: '1.0.0',
}));

// Mock __DEV__ global variable
global.__DEV__ = false;

describe('useAppBarController', () => {
  const mockNavigation = {
    openDrawer: jest.fn(),
    canGoBack: jest.fn(),
    goBack: jest.fn(),
  };

  const mockAppStore = {
    isCollector: false,
    changeIsCollector: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useAppStore as jest.Mock).mockReturnValue(mockAppStore);
  });

  it('should initialize with configDialog set to false', () => {
    const { result } = renderHook(() => useAppBarController());
    expect(result.current.configDialog).toBe(false);
  });

  it('should show config dialog when showConfigDialog is called', () => {
    const { result } = renderHook(() => useAppBarController());

    act(() => {
      result.current.showConfigDialog();
    });

    expect(result.current.configDialog).toBe(true);
  });

  it('should hide config dialog when hideConfigDialog is called', () => {
    const { result } = renderHook(() => useAppBarController());

    act(() => {
      result.current.showConfigDialog();
    });

    expect(result.current.configDialog).toBe(true);

    act(() => {
      result.current.hideConfigDialog();
    });

    expect(result.current.configDialog).toBe(false);
  });

  it('should return the correct version string without DEV suffix when not in dev mode', () => {
    global.__DEV__ = false;
    const { result } = renderHook(() => useAppBarController());
    expect(result.current.version).toBe('v1.0.0');
  });

  it('should return the correct version string with DEV suffix when in dev mode', () => {
    global.__DEV__ = true;
    const { result } = renderHook(() => useAppBarController());
    expect(result.current.version).toBe('v1.0.0-DEV');
  });

  it('should call navigation.openDrawer when devNavigation is called in dev mode', () => {
    global.__DEV__ = true;
    const { result } = renderHook(() => useAppBarController());

    act(() => {
      result.current.devNavigation();
    });

    expect(mockNavigation.openDrawer).toHaveBeenCalled();
  });

  it('should not call navigation.openDrawer when devNavigation is called in production mode', () => {
    global.__DEV__ = false;
    const { result } = renderHook(() => useAppBarController());

    act(() => {
      result.current.devNavigation();
    });

    expect(mockNavigation.openDrawer).not.toHaveBeenCalled();
  });

  it('should return isCollector and changeIsCollector from useAppStore', () => {
    const { result } = renderHook(() => useAppBarController());
    expect(result.current.isCollector).toBe(mockAppStore.isCollector);
    expect(result.current.changeIsCollector).toBe(mockAppStore.changeIsCollector);
  });

  it('should return navigation object from useNavigation', () => {
    const { result } = renderHook(() => useAppBarController());
    expect(result.current.navigation).toBe(mockNavigation);
  });
});
