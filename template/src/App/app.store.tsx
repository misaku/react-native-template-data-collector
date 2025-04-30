import React, {useCallback, useMemo, useReducer, useContext} from 'react';

interface ConfigCollectorProps {
  filterName: string;
  actionNames: string[];
  eventName: string;
  category: string;
}

interface StateProps {
  isCollector: boolean;
  isAuthenticad: boolean;
  config: ConfigCollectorProps;
}

interface CollectorStoreContext extends StateProps {
  changeIsCollector: () => void;
  makeAuthenticad: () => void;
  makeUnauthenticad: () => void;
  setIsCollector: (value: boolean) => void;
  getData: (
    fn: (barcodeData: any) => Promise<void>,
    config?: any,
  ) => (value: any) => Promise<void>;
}

export const AppStore = React.createContext<CollectorStoreContext>(
  {} as CollectorStoreContext,
);

function reducer(state: StateProps, action: {type: string; payload?: boolean}) {
  switch (action.type) {
    case 'CHANGE_IS_COLLECTOR':
      return {
        ...state,
        isCollector: !state.isCollector,
      };
    case 'SET_IS_COLLECTOR':
      return {
        ...state,
        isCollector: !!action.payload,
      };
    case 'AUTHENTICAD':
      return {
        ...state,
        isAuthenticad: true,
      };
    case 'UNAUTHENTICAD':
      return {
        ...state,
        isAuthenticad: false,
      };
    default:
      return state;
  }
}

export const AppStoreProvider: React.FC<
  React.PropsWithChildren<ConfigCollectorProps>
> = ({children, filterName, actionNames, eventName, category}) => {
  const [state, dispatch] = useReducer(reducer, {
    config: {
      actionNames,
      category,
      eventName,
      filterName,
    },
    isCollector: false,
    isAuthenticad: false,
  });

  const changeIsCollector = useCallback(() => {
    dispatch({type: 'CHANGE_IS_COLLECTOR'});
  }, []);
  const setIsCollector = useCallback((value) => {
    dispatch({type: 'SET_IS_COLLECTOR', payload: value});
  }, []);

  const makeAuthenticad = useCallback(() => {
    dispatch({type: 'AUTHENTICAD'});
  }, []);

  const makeUnauthenticad = useCallback(() => {
    dispatch({type: 'UNAUTHENTICAD'});
  }, []);

  const getData = useCallback(
    (fn: (prop: any) => Promise<void>, config = {}) => {
      const {key = actionNames[0]} = config;
      return async (value: any) => {
        await fn(value[key]);
      };
    },
    [actionNames],
  );

  const valueProvider: CollectorStoreContext = useMemo(
    () => ({
      ...state,
      changeIsCollector,
      getData,
      makeAuthenticad,
      makeUnauthenticad,
      setIsCollector,
    }),
    [
      changeIsCollector,
      getData,
      makeAuthenticad,
      makeUnauthenticad,
      state,
      setIsCollector,
    ],
  );

  return (
    <AppStore.Provider value={valueProvider}>{children}</AppStore.Provider>
  );
};

export const useAppStore = () => useContext(AppStore);
