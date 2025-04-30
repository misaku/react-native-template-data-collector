import {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import pakageConfig from '../../../package.json';
import {useAppStore} from '../../App/app.store';

export const useAppBarController = () => {
  const [configDialog, setConfigDialog] = useState(false);
  const {isCollector, changeIsCollector} = useAppStore();

  const showConfigDialog = () => {
    setConfigDialog(true);
  };
  const hideConfigDialog = () => {
    setConfigDialog(false);
  };
  const version = useMemo(() => {
    const dev = __DEV__ ? '-DEV' : '';
    return `v${pakageConfig.version}${dev}`;
  }, []);

  const navigation = useNavigation<any>();
  const devNavigation = useCallback(() => {
    if (__DEV__) navigation.openDrawer();
  }, [navigation]);
  return {
    devNavigation,
    version,
    navigation,
    configDialog,
    isCollector,
    changeIsCollector,
    showConfigDialog,
    hideConfigDialog,
  };
};
