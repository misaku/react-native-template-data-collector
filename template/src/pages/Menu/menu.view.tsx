import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {config} from '@config/config.constants';
import {useMenuController} from '@pages/Menu/menu.controller';
import {ItemMenuProps} from '@pages/Menu/menu.types';
import {
  AntIcon,
  Container,
  CustomButton,
  WrapperButton,
  WrapperButtonContainer,
  Title,
  GradientBKG,
} from '@pages/Menu/menu.styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppLayout} from '../../App/app.layout';
import {RoutesEnum} from '../../routes/routes.enum';
import {RootStackParamList} from '../../routes/routes.types';

export function Menu() {
  const {onRefresh, refreshing} = useMenuController();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const itens: ItemMenuProps[] = [
    {
      id: 'One Reader',
      name: 'One Reader',
      onPress: () => {
        navigation.navigate(RoutesEnum.OneReader);
      },
      icon: <AntIcon name="barcode" />,
      color: config.colors.purple,
    },
    {
      id: 'Multiple Reader',
      name: 'Barcode List',
      onPress: () => {
        navigation.navigate(RoutesEnum.MultipleReader);
      },
      icon: <AntIcon name="profile" />,
      color: config.colors.pink,
    },
    {
      id: 'Multiple Reader Compare',
      name: 'Multiple Reader Compare',
      onPress: () => {
        navigation.navigate(RoutesEnum.MultipleReaderCompare);
      },
      icon: <AntIcon name="swap" />,
      color: config.colors.blue,
    },
    {
      id: 'Assign',
      name: 'Assign',
      onPress: () => {
        navigation.navigate(RoutesEnum.Assign);
      },
      icon: <AntIcon name="form" />,
      color: config.colors.danger,
    },
    {
      id: 'List',
      name: 'List',
      onPress: () => {
        navigation.navigate(RoutesEnum.PageList);
      },
      icon: <AntIcon name="bars" />,
    },
  ];

  return (
    <AppLayout Title="Menu" showConfig>
      <Container>
        <FlatList<ItemMenuProps>
          data={itens}
          keyExtractor={(item, idx) => `dashboard${item.id}-${idx}`}
          renderItem={({item}) => (
            <WrapperButton key={item.id}>
              <WrapperButtonContainer color={item.color}>
                <CustomButton onPress={item.onPress}>
                  <GradientBKG
                    colors={['rgba(0,0,0,0.3)', 'transparent']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                  />
                  {item.icon && item.icon}
                  <Title>{item.name}</Title>
                </CustomButton>
              </WrapperButtonContainer>
            </WrapperButton>
          )}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[config.colors.primary]}
              tintColor={config.colors.primary}
              progressBackgroundColor={config.colors.neutral}
            />
          }
        />
      </Container>
    </AppLayout>
  );
}
