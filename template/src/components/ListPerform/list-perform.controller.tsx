import {useCallback, useMemo, useState} from 'react';
import {useConfigStore} from '@config/config.store';
import {ListPerformProps} from './list-perform.types';

export function useListPerformController<T = any>({
  getData,
  resetData,
  onEndReachedThreshold = 0.1,
}: ListPerformProps<T>) {
  const {config} = useConfigStore();

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const {hasMoreData} = (await getData?.()) ?? {hasMoreData: false};

    if (!hasMoreData) {
      setHasMore(false);
    }
    setIsLoadingMore(false);
  }, [isLoadingMore, hasMore, getData]);

  const refreshList = useCallback(async () => {
    setRefreshing(true);
    const {hasMoreData} = (await resetData?.()) ?? {hasMoreData: false};
    setHasMore(hasMoreData);
    setRefreshing(false);
  }, [resetData]);

  const flatlistConfig = useMemo(
    () =>
      getData
        ? {
            onEndReached: fetchMoreData, // Carrega mais itens ao rolar até o fim
            onEndReachedThreshold, // Quando faltarem 10% para o fim, ativa o carregamento
          }
        : {},
    [fetchMoreData, getData, onEndReachedThreshold],
  );
  return {refreshing, flatlistConfig, refreshList, config, isLoadingMore};
}
