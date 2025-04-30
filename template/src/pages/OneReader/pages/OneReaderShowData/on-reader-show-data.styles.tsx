import {Text} from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
export const Title = styled(Text)`
  font-weight: bold;
`;

export const Value = styled(Text)`
  color: ${(props) => props?.theme?.colors?.primary};
`;
