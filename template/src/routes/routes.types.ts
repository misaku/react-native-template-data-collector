import {RoutesEnum} from './routes.enum';

export interface OneReaderShowDataParamsProps {
  value: string;
}

export type RootStackParamList = {
  [RoutesEnum.Login]: undefined;
  [RoutesEnum.Menu]: undefined;
  [RoutesEnum.OneReader]: undefined;
  [RoutesEnum.MultipleReader]: undefined;
  [RoutesEnum.MultipleReaderCompare]: undefined;
  [RoutesEnum.PageList]: undefined;
  [RoutesEnum.Assign]: undefined;
  [RoutesEnum.OneReaderShowData]: OneReaderShowDataParamsProps;
};
