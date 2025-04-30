import styled, {css} from 'styled-components/native';

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

export const TabHeader = styled.View`
  height: 40px;
  width: 100%;
  align-self: stretch;
  position: relative;
  flex-direction: row;
`;
interface TabItemProps {
  active?: boolean;
}
export const TabItem = styled.View<TabItemProps>`
  background: #f4f4f4;
  flex: 1;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      background: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    `}
`;
interface TabTitleProps {
  active?: boolean;
  type?: 'normal' | 'success' | 'error';
}
export const TabTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`;

export const TabTValue = styled.Text<TabTitleProps>`
  text-align: center;
  padding-bottom: 5px;
  ${(props) =>
    props.active &&
    css`
      font-weight: bold;
    `}
  color: ${(props) => props.theme.colors.black};
  ${(props) =>
    props.type === 'success' &&
    css`
      color: ${props.theme.colors.success};
    `}
  ${(props) =>
    props.type === 'error' &&
    css`
      color: ${props.theme.colors.danger};
    `}
`;
