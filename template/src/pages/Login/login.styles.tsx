import styled from 'styled-components/native';
import {Text, TextInput} from 'react-native-paper';

import {Button} from '@components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${(props) => props.theme.measures.padding * 2}px;
  background-color: ${(props) => props.theme.colors.primary};
`;
export const LabelContainer = styled.View``;

export const Input = styled(TextInput)``;
export const Title = styled(Text)`
  margin-bottom: ${(props) => props.theme.measures.margin}px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
`;
export const CustomButton = styled(Button)`
  flex: 1;
  margin: 0;
  margin-right: 0;
  margin-left: 0;
`;
