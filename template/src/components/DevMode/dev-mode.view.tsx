import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import DevContent from './components/DevModeContent/dev-mode-content.view';

export function DevMode(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DevContent {...props} />
    </DrawerContentScrollView>
  );
}
