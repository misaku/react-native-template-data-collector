import React from 'react';
import {Text} from 'react-native';
import {CamCollectorScanner} from '@components/CamCollectorScanner';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppLayout} from '../../App/app.layout';
import {RoutesEnum} from '../../routes/routes.enum';
import type {RootStackParamList} from '../../routes/routes.types';

export function OneReader() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <AppLayout>
      <CamCollectorScanner
        typeScanner="both"
        onBarcodeReader={async (value) => {
          navigation.navigate(RoutesEnum.OneReaderShowData, {value});
        }}
        infoChildren={<Text>Escaneio Codigo de barras ou QR CODE</Text>}
      />
    </AppLayout>
  );
}
