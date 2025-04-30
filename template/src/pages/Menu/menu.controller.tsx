import {useCallback, useState} from 'react';

export function useMenuController() {
  const [refreshing, setRefreshing] = useState(false);

  // Função chamada quando o usuário faz o gesto de "refresh"
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simula uma requisição ou atualização
    setTimeout(() => {
      console.log('Lista atualizada!');
      setRefreshing(false);
    }, 2000);
  }, []);

  return {refreshing, onRefresh};
}
