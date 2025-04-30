import SignatureCapture from 'react-native-signature-capture';
import styled from 'styled-components/native';
import {Button} from '@components/Button';

export const Container = styled.View`
  padding: 20px;
  flex: 1;
`;

export const SignedButtonLeft = styled(Button)`
  margin-right: 5px;
  flex: 1;
`;
export const SignedButtonRight = styled(Button)`
  margin-left: 5px;
  flex: 1;
`;
export const Content = styled.View`
  flex: 1;
`;
export const SignatureBox = styled.View`
  flex: 1;
  border-bottom-color: ${(props) => props.theme.colors.black};
  border-bottom-width: 2px;
  max-height: 50%;
`;

export const Signature = styled(SignatureCapture)`
  flex: 1;
`;

export const SignatureText = styled.Text`
  align-self: stretch;
  text-align: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;
