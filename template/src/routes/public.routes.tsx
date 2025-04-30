import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '@pages/Login';
import {RoutesEnum} from './routes.enum';

const {Navigator, Screen} = createNativeStackNavigator();

export const PublicRoutes: React.FC = () => (
  <Navigator
    initialRouteName={RoutesEnum.Login}
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name={RoutesEnum.Login} component={Login} />
  </Navigator>
);
