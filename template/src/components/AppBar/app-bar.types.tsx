import React from 'react';

export interface ContainerProps {
  center?: boolean;
}
export interface TitleProps {
  strong?: boolean;
  hight?: boolean;
}
export interface AppBarProps {
  Right?: React.ReactNode;
  Left?: React.ReactNode;
  Title?: string;
  showConfig?: boolean;
}
