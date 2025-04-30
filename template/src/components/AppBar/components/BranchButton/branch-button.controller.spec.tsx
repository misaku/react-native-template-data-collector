import React from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {useConfigStore} from '@config/config.store';
import {useBranchtore} from '@hook/branch.store';
import {useBrachButtonController} from './branch-button.controller';

// Mock dependencies
jest.mock('@config/config.store', () => ({
  useConfigStore: jest.fn(),
}));

jest.mock('@hook/branch.store', () => ({
  useBranchtore: jest.fn(),
}));

describe('useBrachButtonController', () => {
  const mockActionSheetRef = {
    current: {
      show: jest.fn(),
    },
  };

  const mockConfig = {
    colors: {
      primary: '#123456',
    },
  };

  const mockBranch = {
    id: '1',
    name: 'Branch 1',
  };

  const mockBranches = [
    {id: '1', name: 'Branch 1'},
    {id: '2', name: 'Branch 2'},
  ];

  const mockSetBrachById = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useConfigStore as jest.Mock).mockReturnValue({config: mockConfig});
    (useBranchtore as jest.Mock).mockReturnValue({
      branch: mockBranch,
      branches: mockBranches,
      setBrachById: mockSetBrachById,
    });

    // Mock useRef
    jest.spyOn(React, 'useRef').mockReturnValue(mockActionSheetRef);
  });

  it('should return actionSheetRef', () => {
    const {result} = renderHook(() => useBrachButtonController());
    expect(result.current.actionSheetRef).toBe(mockActionSheetRef);
  });

  it('should call actionSheetRef.current.show when showActionSheet is called', () => {
    const {result} = renderHook(() => useBrachButtonController());

    act(() => {
      result.current.showActionSheet();
    });

    expect(mockActionSheetRef.current.show).toHaveBeenCalled();
  });

  it('should return state with branches and branch from useBranchtore', () => {
    const {result} = renderHook(() => useBrachButtonController());
    expect(result.current.state).toEqual({
      branches: mockBranches,
      branch: mockBranch,
    });
  });

  it('should return setBrachById from useBranchtore', () => {
    const {result} = renderHook(() => useBrachButtonController());
    expect(result.current.setBrachById).toBe(mockSetBrachById);
  });

  it('should return config from useConfigStore', () => {
    const {result} = renderHook(() => useBrachButtonController());
    expect(result.current.config).toBe(mockConfig);
  });
});
