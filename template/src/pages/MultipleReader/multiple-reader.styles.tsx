import styled from 'styled-components/native';

export const ItemContainer = styled.View`
  padding: 15px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.inverseOnSurface};
`;
export const ItemContent = styled.View`
  flex-direction: row;
`;

export const ItemTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.black};
  margin-right: 10px;
`;

export const ItemValue = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.colors.text};
`;
