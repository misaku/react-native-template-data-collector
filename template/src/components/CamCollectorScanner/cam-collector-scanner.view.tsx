import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useAppStore} from '../../App/app.store';
import {CollectorScanner} from './components/CollectorScanner';
import {CamScanner} from './components/CamScanner';
import {CamCollectorScannerProps} from './cam-collector-scanner.types';
import {Content} from './cam-collector-scanner.styles';

export const CamCollectorScanner: React.FC<
  React.PropsWithChildren<CamCollectorScannerProps>
> = React.memo(
  ({children, onBarcodeReader, typeScanner, zoom, infoChildren, hasMany}) => {
    const {isCollector} = useAppStore();
    const isFocused = useIsFocused();
    const Component = isCollector ? CollectorScanner : CamScanner;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onReader = isFocused ? onBarcodeReader : async (_prop: any) => {};
    return (
      <Content>
        <Component
          onBarcodeReader={onReader}
          typeScanner={typeScanner}
          hasMany={hasMany}
          list={hasMany ? <Content>{children}</Content> : undefined}
          zoom={zoom}>
          {infoChildren}
        </Component>
      </Content>
    );
  },
);
