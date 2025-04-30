import {useMemo, useRef} from 'react';
import SignatureCapture from 'react-native-signature-capture';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../routes/routes.types'; // ajuste o caminho/tipo conforme sua definição real

export const useAssignController = () => {
  const signatureRef = useRef<SignatureCapture>(null);
  const textSignature = useMemo(
    () => `${format(Date.now(), 'dd/MM/yyyy')}`,
    [],
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const saveSign = () => {
    signatureRef.current?.saveImage();
  };

  const resetSign = () => {
    signatureRef.current?.resetImage();
  };
  const onSaveEvent = async (result) => {
    navigation.popToTop();
    // setLoading(true);
    // const {success} = await ServicePutSignatureImg(params.itemAddress.id, result.encoded);
    // setLoading(false);
    // if (success) {
    //  setFinishMsg('Entrega de lote concluida com sucesso!');
    // }
  };
  return {onSaveEvent, saveSign, resetSign, textSignature, signatureRef};
};
