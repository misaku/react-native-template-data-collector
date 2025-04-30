import {RNCamera} from 'react-native-camera';
import styled, {css} from 'styled-components/native';

interface CameraViewProps {
  multiple?: boolean;
}
export const Container = styled.View<CameraViewProps>`
  flex: 1;
  flex-direction: column;
  ${({multiple}) =>
    multiple &&
    css`
      max-height: 50%;
    `}
`;
export const WrapText = styled.View`
  flex-direction: column;
  min-height: 40px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
export const WrapperCamera = styled.View`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const CameraView = styled(RNCamera)`
  width: 100%;
  height: 100%;
`;
