import axios from 'axios';

import {showMessage, MessageOptions} from 'react-native-flash-message';
import {API_TOKEN, API_BASE_URL} from '@env';
import {version} from '../../package.json';

export const getToken = async (): Promise<string | null> => API_TOKEN;
export const logoutUser = (): void => console.log('Logout disparado!');
export const handleErrors = async (
  status: number,
  data?: any,
): Promise<void> => {
  const errorMessages: Record<number, MessageOptions> = {
    400: {
      type: 'danger',
      message: 'Requisição inválida.',
      description: data?.message ?? 'Erro desconhecido.',
    },
    401: {
      type: 'danger',
      message: 'Não autorizado!',
      description: 'Não autorizado. Faça Login novamente.',
    },
    403: {
      type: 'danger',
      message: 'Acesso negado.',
      description: 'Você não tem permissão para isso.',
    },
    404: {
      type: 'danger',
      message: 'Oops',
      description: 'Recurso não encontrado.',
    },
    500: {
      type: 'danger',
      message: 'Erro interno do servidor.',
      description: 'Erro interno do servidor. Tente novamente mais tarde.',
    },
  };

  const alertData = errorMessages[status] ?? {
    type: 'danger',
    message: 'Erro inesperado.',
    description: data?.message ?? 'Erro desconhecido.',
  };

  showMessage(alertData);

  if (status === 401) logoutUser();
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {AppVersion: version},
});
