import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {RNCamera} from 'react-native-camera';
import Orientation, {
  useDeviceOrientationChange,
  LANDSCAPE,
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
} from 'react-native-orientation-locker';

import {useConfigStore} from '@config/config.store';
import {CamScannerHookProps} from './cam-scanner.types';

export const useCamScanner = ({
  typeScanner = 'qrcode',
  hasMany = false,
  onBarcodeReader,
}: CamScannerHookProps) => {
  const camera = useRef<RNCamera>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [orientation, setOrientation] = React.useState('PORTRAIT');
  const {config} = useConfigStore();

  useDeviceOrientationChange((o) => {
    setOrientation(o.replace('-', '_'));
  });

  const isMultiple = useMemo(() => {
    if (typeScanner === 'both') {
      if ([LANDSCAPE, LANDSCAPE_LEFT, LANDSCAPE_RIGHT].includes(orientation)) {
        return false;
      }
    }
    return hasMany;
  }, [typeScanner, hasMany, orientation]);

  useEffect(() => {
    let isLocked = false;
    if (!isMultiple && typeScanner === 'barcode' && isReady) {
      Orientation.lockToLandscape();
      isLocked = true;
    } else if (typeScanner === 'qrcode' && isReady) {
      Orientation.lockToPortrait();
      isLocked = true;
    }
    return () => {
      if (isLocked) {
        Orientation.unlockAllOrientations();
      }
    };
  }, [isMultiple, typeScanner, isReady]);

  const maskProps = useMemo(() => {
    if (typeScanner === 'both') {
      if ([LANDSCAPE, LANDSCAPE_LEFT, LANDSCAPE_RIGHT].includes(orientation)) {
        return {width: '90%', height: 100};
      }
      if (isMultiple) {
        return {width: '80%', height: '80%'};
      }
      return {};
    }
    if (typeScanner === 'qrcode') {
      if (isMultiple) {
        return {width: '90%', height: '80%'};
      }
      return {};
    }
    return {width: '90%', height: 100};
  }, [typeScanner, isMultiple, orientation]);
  const setIsReadyTrue = useCallback(() => setIsReady(true), []);
  const onBarcodeReaderData = useCallback(
    async ({barcodes}) => {
      if (barcodes.length > 0) {
        await onBarcodeReader(barcodes);
      }
    },
    [onBarcodeReader],
  );
  return {
    camera,
    isReady,
    maskProps,
    setIsReadyTrue,
    config,
    onBarcodeReaderData,
    isMultiple,
  };
};
