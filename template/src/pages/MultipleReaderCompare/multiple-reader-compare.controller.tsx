import {AddressProps} from '@pages/MultipleReaderCompare/multiple-reader-compare.types';
import {useCallback, useMemo, useState} from 'react';

export function useMultipleReaderCompareController() {
  const [listBase] = useState<AddressProps[]>([
    {
      key: JSON.stringify({street: 0, block: 0, apartment: 0, room: 0}),
      street: '0',
      block: '0',
      apartment: '0',
      room: '0',
    },
    {
      key: JSON.stringify({street: 0, block: 0, apartment: 0, room: 1}),
      street: '0',
      block: '0',
      apartment: '0',
      room: '1',
    },
    {
      key: JSON.stringify({street: 1, block: 1, apartment: 1, room: 0}),
      street: '1',
      block: '1',
      apartment: '1',
      room: '0',
    },
  ]);
  const [typeList, setTypeList] = useState<'all' | 'unfinded' | 'finded'>(
    'all',
  );
  const [list, setList] = useState<AddressProps[]>([]);

  const setAll = () => setTypeList('all');
  const setFinded = () => setTypeList('finded');
  const setUnfinded = () => setTypeList('unfinded');

  const isActive = useCallback(
    (name: 'all' | 'unfinded' | 'finded') => name === typeList,
    [typeList],
  );
  const keyExtractor = useCallback((item: AddressProps) => item.key, []);

  const onReader = useCallback(async (value: string) => {
    setList((prev: any) => {
      if (prev.find((e: any) => e.key === value)) {
        return [...prev];
      }
      return [
        ...prev,
        {
          key: value,
          ...JSON.parse(value),
        } as AddressProps,
      ];
    });
  }, []);

  const courrentList = useMemo(() => {
    if (typeList === 'finded') {
      return list;
    }
    if (typeList === 'unfinded') {
      const kbase = list.map((e) => e.key);
      console.log('kbase', kbase);
      return listBase.filter((e) => !kbase.includes(e.key));
    }

    return listBase;
  }, [list, listBase, typeList]);

  const counters = useMemo(() => {
    const all = listBase.length;
    const finded = list.length;
    const unfinded = all - finded;
    return {all, finded, unfinded};
  }, [list, listBase]);
  return {
    courrentList,
    keyExtractor,
    onReader,
    setAll,
    setFinded,
    setUnfinded,
    counters,
    isActive,
  };
}
