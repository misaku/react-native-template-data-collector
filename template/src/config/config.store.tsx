import React, {useContext, useMemo, useReducer} from 'react';
import {ConfigStoreContext, StateConfigProps} from './config.types';
import {config} from './config.constants';

export const ConfigStore = React.createContext<ConfigStoreContext>(
  {} as ConfigStoreContext,
);

function reducer(
  state: StateConfigProps,
  action: {type: string; payload: Partial<StateConfigProps>},
) {
  switch (action.type) {
    case 'updateConfig':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const ConfigStoreProvider: React.FC<
  React.PropsWithChildren<StateConfigProps>
> = ({children, ...rest}) => {
  const [state] = useReducer(reducer, {
    config: {
      ...config,
      ...(rest?.config || {}),
    },
  } as StateConfigProps);

  const valueProvider: ConfigStoreContext = useMemo(
    () => ({
      ...state,
    }),
    [state],
  );

  return (
    <ConfigStore.Provider value={valueProvider}>
      {children}
    </ConfigStore.Provider>
  );
};

export const useConfigStore = () => useContext(ConfigStore);
