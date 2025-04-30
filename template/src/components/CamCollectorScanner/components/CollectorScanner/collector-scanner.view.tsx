import React from 'react';
import LottieView from 'lottie-react-native';
import {useCollectorScanner} from './collector-scanner.controller';
import {Wrapper, WrapperImage, WrapperText} from './collector-scanner.styles';
import {CollectorScanerProps} from './collector-scanner.types';

export const CollectorScanner: React.FC<
  React.PropsWithChildren<CollectorScanerProps>
> = React.memo(
  ({
    children,
    typeScanner = 'both',
    hasMany = false,
    onBarcodeReader,
    list,
  }) => {
    const {sourceLottie} = useCollectorScanner({
      typeScanner,
      hasMany,
      onBarcodeReader,
      list,
    });
    return (
      <>
        <Wrapper hasMany={hasMany} testID="collector-scanner">
          {hasMany ? (
            <WrapperImage hasMany={hasMany}>
              <LottieView source={sourceLottie} autoPlay loop />
            </WrapperImage>
          ) : (
            <LottieView
              source={sourceLottie}
              autoPlay
              loop
              style={{
                position: 'absolute',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: typeScanner === 'qrcode' ? '70%' : '100%',
              }}
            />
          )}
          {!!children && (
            <WrapperText hasMany={hasMany}>{children}</WrapperText>
          )}
        </Wrapper>
        {list && list}
      </>
    );
  },
);
