import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {useDevModeContentController} from './dev-mode-content.controller';

const DevContent: React.FC = () => {
  const {listEvents} = useDevModeContentController();
  const handlerLabel = useCallback(
    (event: any, k: number) => (labelProps: any) => {
      const {color} = labelProps;
      return (
        <Text
          style={{color}}
          numberOfLines={Math.ceil(event.name.length / 15)}
          testID={`${event.name}-${k}`}>
          {event.name}
        </Text>
      );
    },
    [],
  );
  return (
    <>
      {listEvents.map((event, k) => (
        <DrawerItem
          key={event.name}
          label={handlerLabel(event, k)}
          onPress={event.action}
        />
      ))}
    </>
  );
};

export default React.memo(DevContent);
