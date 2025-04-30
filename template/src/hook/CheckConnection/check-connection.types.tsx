import {MessageType} from 'react-native-flash-message';

export interface CheckConnectionPropsController {
  type?: MessageType;
  title?: string;
  message?: string;
  closeInterval?: number;
}
