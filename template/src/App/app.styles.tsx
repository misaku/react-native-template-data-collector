import {Dialog, Text} from 'react-native-paper';
import styled from 'styled-components/native';

export const Strong = styled(Text)`
  font-weight: bold;
`;

export const DialogCustom = styled(Dialog)`
  border-radius: 10px;
  background-color: ${({theme}) => theme?.colors?.background};
`;
