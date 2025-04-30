import {useApi} from '@hook/Api';

export function useLoginService() {
  const {api} = useApi();
  const postLogin = async (form) => {
    try {
      await api.post('/login', form);
    } catch (error) {}
  };
  return {postLogin};
}
