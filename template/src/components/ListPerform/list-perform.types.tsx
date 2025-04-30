import {ListRenderItem} from 'react-native';

export interface FeedbackData {
  hasMoreData: boolean;
}
export interface ListPerformProps<T = any> {
  list: T[];
  getData?: () => Promise<FeedbackData>;
  resetData?: () => Promise<FeedbackData>;
  renderItem?: ListRenderItem<T>;
  keyExtractor: (item: T) => string;
  onEndReachedThreshold?: number;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  style?: any;
}
