import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {CamCollectorScanner} from '@components/CamCollectorScanner';
import {ListPerform} from '@components/ListPerform';

import {
  ItemContainer,
  ItemContent,
  ItemTitle,
  ItemValue,
} from '@pages/MultipleReader/multiple-reader.styles';
import {useMultipleReaderController} from '@pages/MultipleReader/multiple-reader.controller';
import {AddressProps} from '@pages/MultipleReader/multiple-reader.types';
import {AppLayout} from '../../App/app.layout';

export function MultipleReader() {
  const {list, onReader, keyExtractor} = useMultipleReaderController();
  const renderItem = useCallback(
    ({item}: {item: AddressProps}) => (
      <ItemContainer>
        <ItemContent>
          <ItemTitle>Rua</ItemTitle>
          <ItemValue>{item.street}</ItemValue>
        </ItemContent>
        <ItemContent>
          <ItemTitle>Bloco</ItemTitle>
          <ItemValue>{item.block}</ItemValue>
        </ItemContent>
        <ItemContent>
          <ItemTitle>Apartamento</ItemTitle>
          <ItemValue>{item.apartment}</ItemValue>
        </ItemContent>
        <ItemContent>
          <ItemTitle>Sala</ItemTitle>
          <ItemValue>{item.room}</ItemValue>
        </ItemContent>
      </ItemContainer>
    ),
    [],
  );
  return (
    <AppLayout Title="Multiple Reader">
      <CamCollectorScanner
        typeScanner="both"
        hasMany
        onBarcodeReader={onReader}
        infoChildren={<Text>Escaneio Codigo de barras ou QR CODE</Text>}>
        <ListPerform<AddressProps>
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          list={list}
        />
      </CamCollectorScanner>
    </AppLayout>
  );
}
