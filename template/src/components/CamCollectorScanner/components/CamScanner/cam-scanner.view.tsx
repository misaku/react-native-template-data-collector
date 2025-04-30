import React, {memo} from 'react';
import {RNCamera} from 'react-native-camera';
import {BarcodeMaskWithOuterLayout as ReactNativeMask} from '@nartc/react-native-barcode-mask';
import {CamScannerProps} from './cam-scanner.types';
import {useCamScanner} from './cam-scanner.controller';
import {
  CameraView,
  Container,
  WrapperCamera,
  WrapText,
} from './cam-scanner.styles';

// eslint-disable-next-line import/prefer-default-export,react/display-name
export const CamScanner = memo(
  ({
    zoom,
    typeScanner = 'qrcode',
    children,
    onBarcodeReader,
    hasMany = false,
    testID,
    list,
  }: React.PropsWithChildren<CamScannerProps>) => {
    const {
      camera,
      setIsReadyTrue,
      maskProps,
      config,
      onBarcodeReaderData,
      isMultiple,
    } = useCamScanner({
      typeScanner,
      hasMany,
      onBarcodeReader,
    });
    console.log({isMultiple});
    return (
      <>
        <Container multiple={isMultiple} testID="containner-cam-scanner">
          {config && (
            <WrapperCamera testID={testID || 'camera-base'}>
              <CameraView
                ref={camera}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                zoom={zoom}
                androidCameraPermissionOptions={config.permissons.camera}
                androidRecordAudioPermissionOptions={
                  config.permissons.recordAudio
                }
                captureAudio={false}
                onGoogleVisionBarcodesDetected={onBarcodeReaderData}
                onCameraReady={setIsReadyTrue}>
                <ReactNativeMask
                  {...maskProps}
                  edgeColor={config.colors.primary}
                  backgroundColor={config.colors.black}
                  maskOpacity={0.65}
                  edgeRadius={config.measures.radius}
                />
              </CameraView>
            </WrapperCamera>
          )}
          {!!children && <WrapText>{children}</WrapText>}
        </Container>
        {isMultiple && list}
      </>
    );
  },
);
