import {useEffect} from 'react';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

import {MessageType, showMessage} from 'react-native-flash-message';
import {CheckConnectionPropsController} from './check-connection.types';

export const useCheckConnectionController = ({
  type = 'danger' as MessageType,
  title = 'Internet Connection Problem',
  message = 'Please check your network connection',
  closeInterval,
}: CheckConnectionPropsController) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const {isConnected, isInternetReachable} = state;
      if (!(isConnected || !!isInternetReachable)) {
        showMessage({
          type,
          message: title,
          description: message,
          duration: closeInterval,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [type, title, message, closeInterval]);
};
