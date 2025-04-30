/**
 * Sample React Native Index
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import KeepAwake from 'react-native-keep-awake';
import {Dialog, Portal, Text} from 'react-native-paper';
import {Button} from '@components/Button';
import {AppProviders} from './app.providers';
import {AppRoutes} from './app.routes';
import {DialogCustom, Strong} from './app.styles';
import {useAppController} from './app.controller';

function AppStart() {
  const {hideDialog, visible, setToNotCollector, setToCollector} =
    useAppController();
  return (
    <>
      <KeepAwake />
      <Portal>
        <DialogCustom visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Atenção</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Não conseguimos detectar se seu dispositivo é um{' '}
              <Strong variant="bodyMedium">celula</Strong> ou{' '}
              <Strong variant="bodyMedium">coletor</Strong> por favor nos
              informe:
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="elevated" onPress={setToCollector}>
              Coletor
            </Button>
            <Button onPress={setToNotCollector}>Celular</Button>
          </Dialog.Actions>
        </DialogCustom>
      </Portal>

      <AppRoutes />
    </>
  );
}
function Index() {
  return (
    <AppProviders>
      <AppStart />
    </AppProviders>
  );
}

export default Index;
