import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Menu} from '@pages/Menu';
import {OneReader} from '@pages/OneReader';
import {MultipleReader} from '@pages/MultipleReader';
import {MultipleReaderCompare} from '@pages/MultipleReaderCompare';
import {PageList} from '@pages/PageList';
import {Assign} from '@pages/assign';
import {OneReaderShowData} from '@pages/OneReader/pages/OneReaderShowData';
import {RoutesEnum} from './routes.enum';

const {Navigator, Screen} = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Navigator
    initialRouteName={RoutesEnum.Menu}
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name={RoutesEnum.Menu} component={Menu} />
    <Screen name={RoutesEnum.OneReader} component={OneReader} />
    <Screen name={RoutesEnum.MultipleReader} component={MultipleReader} />
    <Screen
      name={RoutesEnum.MultipleReaderCompare}
      component={MultipleReaderCompare}
    />
    <Screen name={RoutesEnum.PageList} component={PageList} />
    <Screen name={RoutesEnum.Assign} component={Assign} />
    <Screen name={RoutesEnum.OneReaderShowData} component={OneReaderShowData} />
  </Navigator>
);
