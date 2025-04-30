/**
 * Sample React Native Index
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDevice} from 'react-native-device-info';
import {useApi} from '@hook/Api';
import {parseJson} from './app.utils';
import {useAppStore} from './app.store';

export function useAppController() {
  const [visible, setVisible] = React.useState(false);
  const {api} = useApi();
  const {setIsCollector: stCollector} = useAppStore();
  const getData = async () => {
    try {
      return await AsyncStorage.getItem('@HelloWorld/IsCollector');
    } catch (e) {
      return null;
    }
  };
  const storeData = useCallback(async (isCollector) => {
    try {
      const jsonValue = JSON.stringify({isCollector});
      await AsyncStorage.setItem('@HelloWorld/IsCollector', jsonValue);
    } catch (e) {
      // saving error
    }
  }, []);

  const setIsCollector = useCallback(
    async (value: boolean) => {
      stCollector(value);
      await storeData(value);
    },
    [stCollector, storeData],
  );
  const hideDialog = () => setVisible(false);
  const setToCollector = useCallback(() => {
    setIsCollector(true);
    hideDialog();
  }, [setIsCollector]);
  const setToNotCollector = useCallback(() => {
    setIsCollector(false);
    hideDialog();
  }, [setIsCollector]);

  useEffect(() => {
    (async () => {
      const dataIsCollector: any = await getData();
      let isCollectorStorage = false;
      if (dataIsCollector) {
        const dataIsCollectorStorage = parseJson(dataIsCollector);
        isCollectorStorage = dataIsCollectorStorage.isCollector;
      }
      if (isCollectorStorage) {
        stCollector(true);
      } else if (dataIsCollector === null) {
        const device = await getDevice();
        try {
          const response = await api.get('/devices/types', {
            params: {
              model: device.toUpperCase(),
            },
          });

          if (response.status === 200) {
            if (response.data.records[0].type === 'collector') {
              await setIsCollector(true);
            } else {
              await setIsCollector(false);
            }
          } else {
            setVisible(true);
          }
        } catch (e) {
          setVisible(true);
        }
      }
    })();
  }, [api, setIsCollector, stCollector]);

  return {visible, hideDialog, setToCollector, setToNotCollector};
}
