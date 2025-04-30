import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppLayout} from '../../../../App/app.layout';
import {RootStackParamList} from '../../../../routes/routes.types';
import {RoutesEnum} from '../../../../routes/routes.enum';
import {Container, Title, Value} from './on-reader-show-data.styles';

export const OneReaderShowData: React.FC = () => {
  const {params} =
    useRoute<RouteProp<RootStackParamList, RoutesEnum.OneReaderShowData>>();
  const data = JSON.parse(params.value);
  return (
    <AppLayout>
      <Container>
        <Title>Rua</Title>
        <Value>{data.street}</Value>
        <Title>Bloco</Title>
        <Value>{data.block}</Value>
        <Title>Apartamento</Title>
        <Value>{data.apartment}</Value>
        <Title>Sala</Title>
        <Value>{data.room}</Value>
      </Container>
    </AppLayout>
  );
};
