export interface ListEventsProps {
  name: string;
  action: () => Promise<void>;
}

export type SendEventProp = (data: string) => void;
