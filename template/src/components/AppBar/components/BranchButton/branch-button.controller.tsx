import {useCallback, useReducer, useRef} from 'react';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {useConfigStore} from '@config/config.store';
import {useBranchtore} from '@hook/branch.store';

interface Branch {
  id: string;
  name: string;
}

interface StateProps {
  branch: Branch;
  branches: Branch[];
}

export const useBrachButtonController = () => {
  const actionSheetRef = useRef<ActionSheet>(null);
  const {config} = useConfigStore();
  const {branch, branches, setBrachById} = useBranchtore();

  const showActionSheet = () => {
    actionSheetRef?.current?.show();
  };

  return {
    actionSheetRef,
    showActionSheet,
    state: {branches, branch},
    setBrachById,
    config,
  };
};
