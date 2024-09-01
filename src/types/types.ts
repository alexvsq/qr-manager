export type HistoryData = {
  id?: number;
  value: string;
  type: string;
  typeCode: string;
  date: string;
  titleName?: string;
};

export interface WifiData {
  name: string;
  password: string;
  security: string;
  hidden: string;
}
