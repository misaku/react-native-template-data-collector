declare module '*.png';
declare module '*.json';
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}
declare module '@env' {
  export const IGNORE_SSL_ERRORS: string;
  export const API_BASE_URL: string;
  export const API_TOKEN: string;
}
