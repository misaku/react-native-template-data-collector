import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { useAssignController } from './assign.controller';
import { format } from 'date-fns';

// Mock dependencies
jest.mock('react-native-signature-capture', () => {
  return jest.fn().mockImplementation(() => ({
    saveImage: jest.fn(),
    resetImage: jest.fn(),
  }));
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      popToTop: jest.fn(),
    }),
  };
});

describe('useAssignController', () => {
  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useAssignController());

    expect(result.current.textSignature).toBe(format(Date.now(), 'dd/MM/yyyy'));
    expect(result.current.signatureRef).toBeDefined();
    expect(typeof result.current.saveSign).toBe('function');
    expect(typeof result.current.resetSign).toBe('function');
    expect(typeof result.current.onSaveEvent).toBe('function');
  });

  it('should call saveImage when saveSign is called', () => {
    const { result } = renderHook(() => useAssignController());

    // Mock the ref
    const saveImageMock = jest.fn();
    result.current.signatureRef.current = {
      saveImage: saveImageMock,
      resetImage: jest.fn(),
    } as any;

    act(() => {
      result.current.saveSign();
    });

    expect(saveImageMock).toHaveBeenCalled();
  });

  it('should call resetImage when resetSign is called', () => {
    const { result } = renderHook(() => useAssignController());

    // Mock the ref
    const resetImageMock = jest.fn();
    result.current.signatureRef.current = {
      saveImage: jest.fn(),
      resetImage: resetImageMock,
    } as any;

    act(() => {
      result.current.resetSign();
    });

    expect(resetImageMock).toHaveBeenCalled();
  });

  it('should call navigation.popToTop when onSaveEvent is called', async () => {
    const popToTopMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({
      popToTop: popToTopMock,
    });

    const { result } = renderHook(() => useAssignController());

    await act(async () => {
      await result.current.onSaveEvent({ encoded: 'test-encoded-signature' });
    });

    expect(popToTopMock).toHaveBeenCalled();
  });
});
