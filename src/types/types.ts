export type HistoryData = {
  id?: number;
  value: string;
  type: string;
  typeCode: string;
  date: string;
  titleName?: string;
  notes?: string;
};

export interface WifiData {
  name: string;
  password: string;
  security: string;
  hidden: string;
}

export interface ContactData {
  name: string;
  fullName: string;
  organization: string;
  title: string;
  phone: string;
}
export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface SMSData {
  phoneNumber: string;
  message: string;
}

export interface ContactData2 {
  lastName: string;
  firstName: string;
  fullName: string;
  organization: string;
  title: string;
  workPhone: string;
  homePhone: string;
  email: string;
}

export interface SettingsDataSql {
  id: number;
  languages: string;
  sound: boolean;
  vibrate: boolean;
}

export interface screenType {
  module: any;
  name: string;
  title: string;
  subtitle: string;
}

export interface ScreenText {
  id: string;
  title: string;
  subtitle: string;
  secondBtn?: string;
}

export interface ScreensTexts {
  scanner: ScreenText;
  history: ScreenText;
  create: ScreenText;
}
