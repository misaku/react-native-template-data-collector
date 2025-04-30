import React from 'react';
import {Card, HelperText, TextInput} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import {useLoginController} from './login.controller';
import {
  Container,
  Input,
  LabelContainer,
  Title,
  CustomButton,
  ButtonContainer,
} from './login.styles';

export function Login() {
  const {control, visible, changeVisible, finish, setFocus, isLoading} =
    useLoginController();
  return (
    <Container>
      <Card>
        <Card.Content>
          <Title variant="titleLarge">Login</Title>
          <Controller
            name="email"
            control={control}
            render={({
              field: {onBlur, onChange, value, ref},
              fieldState: {error},
            }) => (
              <LabelContainer>
                <Input
                  ref={ref}
                  label="E-Mail"
                  textContentType="emailAddress"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!error}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    setFocus('senha');
                  }}
                />
                <HelperText type="error" visible={!!error}>
                  {error?.message}
                </HelperText>
              </LabelContainer>
            )}
          />

          <Controller
            name="senha"
            control={control}
            render={({
              field: {onBlur, onChange, value, ref},
              fieldState: {error},
            }) => (
              <LabelContainer>
                <Input
                  ref={ref}
                  label="Senha"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!visible}
                  textContentType="password"
                  error={!!error}
                  right={
                    <TextInput.Icon
                      icon={visible ? 'eye-off' : 'eye'}
                      onPress={changeVisible}
                    />
                  }
                  returnKeyType="done"
                  onSubmitEditing={finish}
                />
                <HelperText type="error" visible={!!error}>
                  {error?.message}
                </HelperText>
              </LabelContainer>
            )}
          />
          <ButtonContainer />
          <ButtonContainer>
            <CustomButton onPress={finish} loading={isLoading} mode="contained">
              Entrar
            </CustomButton>
          </ButtonContainer>
        </Card.Content>
      </Card>
    </Container>
  );
}
