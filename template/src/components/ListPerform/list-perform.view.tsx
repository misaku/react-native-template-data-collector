import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {ListPerformProps} from './list-perform.types';
import {FooterLoadingContainer} from './list-perform.style';
import {useListPerformController} from './list-perform.controller';

export function ListPerform<T = any>(props: ListPerformProps<T>) {
  const {
    list,
    renderItem,
    keyExtractor,
    initialNumToRender = 10,
    maxToRenderPerBatch = 10,
    windowSize = 10,
    resetData,
    style,
  } = props;
  const {refreshList, refreshing, config, flatlistConfig, isLoadingMore} =
    useListPerformController(props);
  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <FooterLoadingContainer>
        <ActivityIndicator size="small" color={config?.colors.primary} />
      </FooterLoadingContainer>
    );
  }, [config?.colors.primary, isLoadingMore]);

  return (
    <FlatList<T>
      data={list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter} // Adiciona o indicador de carregamento no final
      {...flatlistConfig}
      refreshControl={
        resetData && (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshList} // Atualiza a lista ao puxar para baixo
            colors={[config?.colors.primary as string]} // Cor no Android
            tintColor={config?.colors.primary} // Cor no iOS
            progressBackgroundColor={config?.colors?.neutral} // Fundo do indicador no Android
          />
        )
      }
      style={style}
      initialNumToRender={initialNumToRender} // Renderiza inicialmente os 10 primeiros itens
      maxToRenderPerBatch={maxToRenderPerBatch} // Máximo de itens a renderizar por vez
      windowSize={windowSize} // Tamanho da janela de pré-carregamento
    />
  );
}
