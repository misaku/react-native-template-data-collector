import {Button as Btn, ButtonProps} from 'react-native-paper';
import styled from 'styled-components/native';
import React from 'react';

export const ButtonBase = styled(Btn)`
  border-radius: 5px;
`;

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  mode = 'contained',
  ...rest
}) => <ButtonBase {...rest} mode={mode} />;
