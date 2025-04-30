import React, {useCallback} from 'react';
import {Searchbar} from 'react-native-paper';
import {ListPerform} from '@components/ListPerform';
import {usePageListController} from './page-list.controller';
import {ItemAddress, ItemContainer, ItemTitle} from './page-list.styles';
import {ItemProps} from './page-list.types';
import {AppLayout} from '../../App/app.layout';

export const PageList = () => {
  const {list, resetData, getData, keyExtractor, setSearchQuery, searchQuery} =
    usePageListController();

  const renderItem = useCallback(
    ({item}: {item: ItemProps}) => (
      <ItemContainer>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemAddress>{item.address}</ItemAddress>
      </ItemContainer>
    ),
    [],
  );

  return (
    <AppLayout Title="List Example">
      <Searchbar
        placeholder="Buscar"
        mode="bar"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{margin: 10, borderRadius: 5}}
      />
      <ListPerform<ItemProps>
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        list={list}
        getData={getData}
        resetData={resetData}
        style={{paddingTop: 5}}
      />
    </AppLayout>
  );
};
