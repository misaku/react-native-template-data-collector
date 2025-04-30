import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useCheckConnectionController} from '@hook/CheckConnection/check-connection.controller';
import {DevMode} from '@components/DevMode';

import {Routes} from '../routes';

export const AppRoutes = () => {
  const Drawer = createDrawerNavigator();
  useCheckConnectionController({
    title: 'Problema de conexão com a Internet',
    message: 'Por favor, verifique sua conexão de rede',
  });
  if (__DEV__) {
    return (
      <Drawer.Navigator
        drawerContent={DevMode}
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Dev" component={Routes} />
      </Drawer.Navigator>
    );
  }

  return <Routes />;
};
