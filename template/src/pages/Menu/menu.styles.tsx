import styled from 'styled-components/native';
import {Surface, Text} from 'react-native-paper';
import {BorderlessButton} from 'react-native-gesture-handler';
import AntIconBase from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {WrapperButtonContainerProps} from '@pages/Menu/menu.types';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 5px;
`;

export const AntIcon = styled(AntIconBase)`
  font-size: 30px;
  color: ${({theme}) => theme?.colors?.textWithBg};
`;

export const Title = styled(Text)`
  text-align: center;
  color: ${({theme}) => theme?.colors?.textWithBg};
`;

export const WrapperButton = styled.View`
  flex: 1;
  padding: ${({theme}) => theme.measures.padding / 2}px;
`;

export const CustomButton = styled(BorderlessButton)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.measures.padding * 2}px;
`;

export const WrapperButtonContainer = styled(
  Surface,
)<WrapperButtonContainerProps>`
  flex: 1;
  background-color: ${({color, theme}) => color || theme?.colors?.primary};
  border-radius: 5px;
`;

export const GradientBKG = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  flex: 1;
  border-radius: 5px;
  bottom: 0;
`;
