export interface ScreenText {
  id: string;
  title: string;
  subtitle: string;
  secondBtn: boolean;
}

export interface ScreensTexts {
  scanner: ScreenText;
  history: ScreenText;
  create: ScreenText;
  settings: ScreenText;
}

export const screensTextsTitles: ScreensTexts = {
  scanner: {
    id: "scanner",
    title: "Scanner",
    subtitle: "Scann a Qr Code", // Cambio en "Subtitle" a "subtitle"
    secondBtn: false,
  },
  history: {
    id: "history",
    title: "History",
    subtitle: "Codes Scanned",
    secondBtn: false,
  },
  create: {
    id: "create",
    title: "Create",
    subtitle: "Code Created",
    secondBtn: false,
  },
  settings: {
    id: "settings",
    title: "Settings",
    subtitle: "settings",
    secondBtn: false,
  },
};
