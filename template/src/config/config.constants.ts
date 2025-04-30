import {dark, light} from '@config/paper.constants';
import {DefaultTheme} from 'react-native-paper';
import {ConfigProps} from './config.types';

export const config: ConfigProps = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...light.colors,
    primary: '#b700ff',
    secondary: '#4c626a',
    tertiary: '#5b807a',
    neutral: '#f4f4f4',
    danger: '#ec4949',
    success: '#4be470',
    purple: '#8a49ec',
    pink: '#ec49be',
    blue: '#49c1ec',
    white: '#ffffff',
    black: '#000000',
    text: '#c4c4c4',
    textWithBg: '#fff',
  },
  measures: {
    padding: 10,
    radius: 5,
    margin: 15,
    font: {
      lowSize: 12,
      hightSize: 15,
    },
  },
  permissons: {
    camera: {
      title: 'Permissão para usar a câmera',
      message: 'Precisamos de sua permissão para usar a câmera',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancelar',
    },
    recordAudio: {
      title: 'Permissão para usar audio',
      message: 'Precisamos de sua permissão para usar a audio',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancelar',
    },
  },
  dark: {
    colors: {
      ...dark.colors,
      primary: '#49c1ec',
      secondary: '#4c626a',
      tertiary: '#5b807a',
      neutral: '#f4f4f4',
      danger: '#ec4949',
      purple: '#8a49ec',
      pink: '#ec49be',
      blue: '#49c1ec',
      white: '#ffffff',
      black: '#000000',
      text: '#c4c4c4',
      textWithBg: '#fff',
    },
  },
};
