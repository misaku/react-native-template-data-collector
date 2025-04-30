import {SendEventProp, ListEventsProps} from './dev-mode-content.types';
import {makeMenuItem} from './dev-mode-content.utils';

export const makeListEvents: (fn: SendEventProp) => ListEventsProps[] = (
  fn,
) => [
  makeMenuItem('0-0-0-0', {street: 0, block: 0, apartment: 0, room: 0}, fn),
  makeMenuItem('0-0-0-1', {street: 0, block: 0, apartment: 0, room: 1}, fn),
];
