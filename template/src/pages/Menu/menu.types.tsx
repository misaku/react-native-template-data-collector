import React from 'react';

export interface ItemMenuProps {
  id: string;
  name: string;
  onPress: () => void;
  icon: React.ReactNode;
  color?: string;
}
export interface WrapperButtonContainerProps {
  color?: string;
}
