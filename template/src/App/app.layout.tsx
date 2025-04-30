/**
 * Sample React Native Index
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import styled from 'styled-components/native';
import {AppBar} from '@components/AppBar';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
interface AppLayoutProps {
  showConfig?: boolean;
  Title?: string;
  Left?: React.ReactNode;
  Right?: React.ReactNode;
}
export const AppLayout: React.FC<React.PropsWithChildren<AppLayoutProps>> = ({
  children,
  ...rest
}) => (
  <Container>
    <AppBar {...rest} />
    <Container>{children}</Container>
  </Container>
);
