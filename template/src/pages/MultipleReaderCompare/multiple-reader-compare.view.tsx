import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {CamCollectorScanner} from '@components/CamCollectorScanner';
import {ListPerform} from '@components/ListPerform';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {config} from '@config/config.constants';
import {useMultipleReaderCompareController} from './multiple-reader-compare.controller';
import {AddressProps} from './multiple-reader.types';
import {
  ItemContainer,
  ItemContent,
  ItemTitle,
  ItemValue,
  TabHeader,
  TabItem,
  TabTitle,
  TabTValue,
} from './multiple-reader-compare.styles';
import {AppLayout} from '../../App/app.layout';

export function MultipleReaderCompare() {
  const {
    courrentList,
    onReader,
    keyExtractor,
    setAll,
    setFinded,
    setUnfinded,
    counters,
    isActive,
  } = useMultipleReaderCompareController();
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
        <TabHeader>
          <TabItem active={isActive('all')}>
            <TouchableOpacity onPress={setAll}>
              <TabTitle>Todos</TabTitle>
              <TabTValue active={isActive('all')}>{counters.all}</TabTValue>
            </TouchableOpacity>
          </TabItem>
          <TabItem active={isActive('unfinded')}>
            <TouchableOpacity onPress={setUnfinded}>
              <TabTitle>A Conferir</TabTitle>
              <TabTValue active={isActive('unfinded')}>
                {counters.unfinded}
              </TabTValue>
            </TouchableOpacity>
          </TabItem>
          <TabItem active={isActive('finded')}>
            <TouchableOpacity onPress={setFinded}>
              <TabTitle>Conferidos</TabTitle>
              <TabTValue active={isActive('finded')}>
                {counters.finded}
              </TabTValue>
            </TouchableOpacity>
          </TabItem>
        </TabHeader>
        <ListPerform<AddressProps>
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          list={courrentList}
        />
      </CamCollectorScanner>
    </AppLayout>
  );
}
