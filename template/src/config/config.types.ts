export interface PermissionConfigProps {
  title: string;
  message: string;
  buttonPositive: string;
  buttonNegative: string;
}
export interface PermissionProps {
  camera: PermissionConfigProps;
  recordAudio: PermissionConfigProps;
}
export interface MeasureProps {
  padding: number;
  radius: number;
  margin: number;
  font: {
    lowSize: number;
    hightSize: number;
  };
}

type Elevation = {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
};

export interface ColorProps {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  elevation: Elevation;
  surfaceDisabled: string;
  onSurfaceDisabled: string;
  backdrop: string;
  neutral: string;
  danger: string;
  white: string;
  black: string;
  purple: string;
  pink: string;
  blue: string;
  text: string;
  textWithBg: string;
}
export interface ConfigProps {
  colors: ColorProps;
  dark: {
    colors: ColorProps;
  };
  measures: MeasureProps;
  permissons: PermissionProps;
}
export interface StateConfigProps {
  config?: ConfigProps;
}

export type ConfigStoreContext = StateConfigProps;
