import React from 'react';

import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {useBrachButtonController} from './branch-button.controller';
import {Button, TitleBar} from '../../app-bar.styles';

export const BranchButton: React.FC = () => {
  const {actionSheetRef, showActionSheet, state, setBrachById, config} =
    useBrachButtonController();

  return (
    <>
      <Button testID="branch-button" onPress={showActionSheet}>
        <TitleBar hight>{state?.branch?.name}</TitleBar>
      </Button>
      <ActionSheet
        ref={actionSheetRef}
        title="Selecione uma filial"
        tintColor={config?.colors.primary}
        options={[
          ...(state?.branches
            ? state.branches.map((branch) => branch?.name)
            : []),
          'cancelar',
        ]}
        cancelButtonIndex={state?.branches?.length}
        onPress={setBrachById}
      />
    </>
  );
};
