import React from 'react';
import {Dialog, Portal, Switch, Text} from 'react-native-paper';
import {View} from 'react-native';
import {
  Button,
  ContainerBar,
  Icon,
  IconM,
  TitleBar,
  WrapperAppBar,
  ButtonBase,
  DialogCustom,
} from './app-bar.styles';
import {BranchButton} from './components/BranchButton/branch-button.view';
import {AppBarProps} from './app-bar.types';
import {useAppBarController} from './app-bar.controller';

export const AppBar: React.FC<AppBarProps> = ({
  Right,
  Left,
  Title,
  showConfig = false,
}) => {
  const {
    version,
    devNavigation,
    navigation,
    configDialog,
    showConfigDialog,
    hideConfigDialog,
    changeIsCollector,
    isCollector,
  } = useAppBarController();

  return (
    <WrapperAppBar>
      <ContainerBar>
        {navigation.canGoBack() && (
          <Button testID="back-button" onPress={navigation.goBack}>
            <IconM name="arrow-back" />
          </Button>
        )}
        {Left && Left}
      </ContainerBar>
      <ContainerBar center>
        <TitleBar strong>{Title}</TitleBar>
      </ContainerBar>
      <ContainerBar>
        <BranchButton />
        <Button testID="version-button" onPress={devNavigation}>
          <TitleBar>{version}</TitleBar>
        </Button>
        {Right && Right}
        {showConfig && (
          <Button testID="config-button" onPress={showConfigDialog}>
            <Icon name="gears" />
          </Button>
        )}
      </ContainerBar>
      <Portal>
        <DialogCustom testID="dialog-custom" visible={configDialog} onDismiss={hideConfigDialog}>
          <Dialog.Content>
            <Dialog.Title>Configuraçao</Dialog.Title>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                paddingLeft: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Colletor:</Text>
              <View>
                <Switch value={isCollector} onValueChange={changeIsCollector} />
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonBase onPress={hideConfigDialog}>Fechar</ButtonBase>
          </Dialog.Actions>
        </DialogCustom>
      </Portal>
    </WrapperAppBar>
  );
};
