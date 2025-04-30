import React from 'react';
import {config} from '@config/config.constants';
import {useAssignController} from '@pages/assign/assign.controller';
import {
  Container,
  Content,
  Footer,
  Signature,
  SignatureBox,
  SignatureText,
  SignedButtonLeft,
  SignedButtonRight,
} from '@pages/assign/assign.styles';
import {AppLayout} from '../../App/app.layout';

export const Assign = () => {
  const {signatureRef, textSignature, onSaveEvent, saveSign, resetSign} =
    useAssignController();
  return (
    <AppLayout Title="Assinatura" showConfig>
      <Container>
        <Content>
          <SignatureBox>
            <Signature
              ref={signatureRef}
              onSaveEvent={onSaveEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              backgroundColor={config.colors.white}
              strokeColor={config.colors.primary}
              minStrokeWidth={4}
              maxStrokeWidth={4}
              viewMode="portrait"
            />
          </SignatureBox>
          <SignatureText>{textSignature}</SignatureText>
        </Content>
        <Footer>
          <SignedButtonLeft mode="elevated" onPress={resetSign}>
            Limpar
          </SignedButtonLeft>
          <SignedButtonRight onPress={saveSign}>Salvar</SignedButtonRight>
        </Footer>
      </Container>
    </AppLayout>
  );
};
