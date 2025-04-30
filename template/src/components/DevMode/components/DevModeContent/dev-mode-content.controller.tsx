import {useCallback, useMemo} from 'react';
import {useBroadcastSender} from 'react-native-rodney-broadcast';
import {useAppStore} from '../../../../App/app.store';
import {makeListEvents} from './dev-mode-content.constants';

export const useDevModeContentController = () => {
  const {config} = useAppStore();
  const {sendBroadcast} = useBroadcastSender({
    ...config,
  });
  const simulateScan = useCallback(
    (data) => {
      // navigation.closeDrawer();
      sendBroadcast(data, config.actionNames[0]);
    },
    [config.actionNames, sendBroadcast],
  );
  const listEvents = useMemo(
    () => makeListEvents(simulateScan),
    [simulateScan],
  );
  return {listEvents};
};
