import styled, {css} from 'styled-components/native';
import {WrapperProps} from './collector-scanner.types';

export const Wrapper = styled.View<WrapperProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({theme}) => theme?.colors?.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme?.colors?.inverseOnSurface};
  ${({hasMany}) =>
    hasMany &&
    css`
      flex-direction: row;
      max-height: 80px;
      justify-content: center;
      align-items: center;
    `}
`;
export const WrapperImage = styled.View<WrapperProps>`
  width: 60px;
  height: 60px;
  background-color: #f4f4f4;
  border-radius: 5px;
  ${({hasMany}) =>
    hasMany &&
    css`
      margin: 10px;
    `}
`;
export const WrapperText = styled.View<WrapperProps>`
  margin-top: 200px;
  justify-content: center;
  align-items: center;
  ${({hasMany}) =>
    hasMany &&
    css`
      flex: 1;
      height: 100%;
      margin-top: 0;
      justify-content: flex-start;
      align-items: flex-start;
    `}
`;
