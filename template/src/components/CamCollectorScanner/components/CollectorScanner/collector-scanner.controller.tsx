import {useMemo} from 'react';
import {useBroadcast} from 'react-native-rodney-broadcast';

import barcode from '@assets/barcode_scaner.json';
import qrcode from '@assets/qr_code_scaner.json';
import barcodeBox from '@assets/barcode_box.json';
import {useAppStore} from '../../../../App/app.store';

import {CollectorScanerProps} from './collector-scanner.types';

export const useCollectorScanner = ({
  typeScanner = 'both',
  hasMany = false,
  onBarcodeReader,
}: CollectorScanerProps) => {
  const {config, getData} = useAppStore();

  useBroadcast({
    ...config,
    fn: getData(onBarcodeReader),
  });

  const sourceLottie = useMemo(() => {
    if (hasMany) {
      return barcodeBox;
    }
    if (typeScanner === 'qrcode') {
      return qrcode;
    }
    return barcode;
  }, [typeScanner, hasMany]);

  return {sourceLottie};
};
