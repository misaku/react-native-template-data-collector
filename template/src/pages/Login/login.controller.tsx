import React from 'react';
import {useForm, Resolver} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {validatorLoginSchema} from './login.validators';
import {FormDataProps} from './login.types';
import {useLoginService} from './login.service';
import {useAppStore} from '../../App/app.store';

const resolver = yupResolver(
  validatorLoginSchema,
) as unknown as Resolver<FormDataProps>;
export function useLoginController() {
  const [visible, setVisible] = React.useState(false);
  const [isLoading, seIsLoading] = React.useState(false);
  const changeVisible = () => setVisible((prev) => !prev);
  const {makeAuthenticad} = useAppStore();
  const {handleSubmit, control, setFocus} = useForm<FormDataProps>({
    resolver,
    mode: 'onBlur',
    defaultValues: {
      email: '',
      senha: '',
    },
  });
  const {postLogin} = useLoginService();
  const finish = handleSubmit(async (data) => {
    seIsLoading(true);
    await postLogin(data);
    seIsLoading(false);
    makeAuthenticad();
  });

  return {visible, changeVisible, finish, control, setFocus, isLoading};
}
