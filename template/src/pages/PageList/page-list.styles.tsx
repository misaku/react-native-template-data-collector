import styled from 'styled-components/native';

export const ItemContainer = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.inverseOnSurface};
`;

export const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const ItemAddress = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;
