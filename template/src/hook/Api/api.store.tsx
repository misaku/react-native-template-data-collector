import React, {createContext, useContext, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {ApiContextProps} from '@hook/Api/api.types';
import {api, getToken, handleErrors} from '@hook/Api/api.utils';

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  useEffect(() => {
    api.interceptors.request.use(
      async (config) => {
        const token = await getToken();

        if (token) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn('[Axios Request] Tentativa de requisição sem token.');
        }
        return config;
      },
      (error) => {
        console.error('[Axios Request Error]', error);
        return Promise.reject(error);
      },
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const {status, data} = error.response;
          await handleErrors(status, data);
        } else {
          showMessage({
            type: 'danger',
            message: 'Erro de conexão.',
            description: 'Erro de conexão. Verifique sua internet.',
          });
        }
        return Promise.reject(error);
      },
    );
  }, []);
  return <ApiContext.Provider value={{api}}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider.');
  }

  return context;
};
