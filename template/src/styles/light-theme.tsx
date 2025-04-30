import {config} from '@config/config.constants';
import {DefaultTheme} from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...config.colors,
  },
  measures: config.measures,
};

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...config.dark.colors,
  },
  measures: config.measures,
};
