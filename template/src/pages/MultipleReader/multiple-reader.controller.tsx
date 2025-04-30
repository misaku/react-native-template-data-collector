import {useCallback, useMemo, useState} from 'react';
import {AddressProps} from '@pages/MultipleReader/multiple-reader.types';

export function useMultipleReaderController() {
  const [list, setList] = useState<AddressProps[]>([]);

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

  return {list, keyExtractor, onReader};
}
