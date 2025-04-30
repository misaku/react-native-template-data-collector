import * as yup from 'yup';
import {FormDataProps} from './login.types';

export const validatorLoginSchema: yup.ObjectSchema<FormDataProps> = yup
  .object({
    email: yup
      .string()
      .required('E-mail é obrigatório')
      .email('Digite um e-mail válido'),

    senha: yup
      .string()
      .required('Senha é obrigatória')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .matches(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .matches(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
      .matches(/[0-9]/, 'Senha deve conter pelo menos um número')
      .matches(
        /[^A-Za-z0-9]/,
        'Senha deve conter pelo menos um caractere especial',
      ),
  })
  .required();
