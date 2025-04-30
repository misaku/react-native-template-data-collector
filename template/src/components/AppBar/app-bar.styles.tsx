import styled, {css} from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler';
import MIcon from 'react-native-vector-icons/FontAwesome';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import {Button as Btn} from '@components/Button';
import {Dialog as Dl} from 'react-native-paper';
import {ContainerProps, TitleProps} from './app-bar.types';

export const WrapperAppBar = styled.View`
  height: 40px;
  width: 100%;
  flex-direction: row;
  background-color: ${({theme}) => theme?.colors?.primary};
`;

export const ContainerBar = styled.View<ContainerProps>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${({center}) =>
    center &&
    css`
      justify-content: flex-start;
      flex: 1;
    `}
`;

export const Icon = styled(MIcon)`
  text-align: center;
  font-size: 16px;
  color: ${({theme}) => theme.colors.textWithBg};
`;

export const IconM = styled(MTIcon)`
  text-align: center;
  font-size: 20px;
  color: ${({theme}) => theme.colors.textWithBg};
`;

export const TitleBar = styled.Text<TitleProps>`
  text-align: center;
  margin-left: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.textWithBg};
  ${({strong}) =>
    strong &&
    css`
      font-size: 15px;
    `}
  ${({hight}) =>
    hight &&
    css`
      text-transform: uppercase;
    `}
`;

export const Button = styled(BorderlessButton)`
  padding: 10px 5px;
  height: 36px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const ButtonBase = styled(Btn)`
  flex: 1;
`;

export const DialogCustom = styled(Dl)`
  border-radius: 10px;
  background-color: ${({theme}) => theme?.colors?.background};
`;
