import {ListEventsProps, SendEventProp} from './dev-mode-content.types';

export const makeString = (item: any) => {
  if (typeof item === 'string') {
    return item;
  }
  return JSON.stringify(item);
};
export const makeMenuItem = (name: string, data: any, fn: SendEventProp) => {
  let payload: string[] = [];
  if (Array.isArray(data)) {
    payload = data.map(makeString);
  } else {
    payload = [makeString(data)];
  }
  return {
    name,
    action: async () => {
      console.log('entrou a');
      payload.forEach((item) => {
        fn(item);
        console.log('entrou b');
      });
    },
  } as ListEventsProps;
};
