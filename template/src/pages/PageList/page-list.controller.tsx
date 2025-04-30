import {useCallback, useState} from 'react';
import {ItemProps} from './page-list.types';

export const usePageListController = () => {
  const [list, setList] = useState<ItemProps[]>(
    Array.from({length: 30}).map((_, index) => ({
      id: (index + 1).toString(),
      title: `Produto ${index + 1}`,
      address: `Endereço ${index + 1}`,
    })),
  );

  const [searchQuery, setSearchQuery] = useState('');
  const resetData = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const data = Array.from({length: 30}).map((_, index) => ({
      id: (index + 1).toString(),
      title: `Produto ${index + 1}`,
      address: `Endereço ${index + 1}`,
    }));
    setList(data);
    return {hasMoreData: true};
  };

  const getData = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    const nextItems = Array.from({length: 10}).map((_, index) => ({
      id: (list.length + index + 1).toString(),
      title: `Produto ${list.length + index + 1}`,
      address: `Endereço ${list.length + index + 1}`,
    }));
    setList((prevList) => [...prevList, ...nextItems]);
    return {
      hasMoreData: !(list.length + nextItems.length >= 50),
    };
  };

  const keyExtractor = useCallback((item: ItemProps) => item.id, []);

  return {
    list,
    resetData,
    getData,
    keyExtractor,
    setSearchQuery,
    searchQuery,
  };
};
