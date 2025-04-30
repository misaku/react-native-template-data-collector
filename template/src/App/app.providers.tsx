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
import {SafeAreaView, StatusBar} from 'react-native';

import {ConfigStoreProvider} from '@config/config.store';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'styled-components';
import {ApiProvider} from '@hook/Api';
import FlashMessage from 'react-native-flash-message';
import {AuthProvider} from '@hook/auth.store';
import {BranchProvider} from '@hook/branch.store';
import {AppStoreProvider} from './app.store';
import {lightTheme} from '../styles/light-theme';

export function AppProviders({children}: React.PropsWithChildren<any>) {
  return (
    <ConfigStoreProvider>
      <ApiProvider>
        <AppStoreProvider
          actionNames={['EXTRA_BARCODE_DECODED_DATA']}
          eventName="RODNEY"
          filterName="com.rodney.action"
          category="com.rodney.category">
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <ThemeProvider theme={lightTheme}>
              <PaperProvider theme={lightTheme}>
                <AuthProvider>
                  <BranchProvider>
                    <FlashMessage position="top" />
                    <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
                  </BranchProvider>
                </AuthProvider>
              </PaperProvider>
            </ThemeProvider>
          </NavigationContainer>
        </AppStoreProvider>
      </ApiProvider>
    </ConfigStoreProvider>
  );
}
