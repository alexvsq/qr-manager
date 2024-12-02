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

export const screensTextsTitles: ScreensTexts = {
  scanner: {
    id: "scanner",
    title: "Scanner",
    subtitle: "Scan a Qr Code",
  },
  history: {
    id: "history",
    title: "History",
    subtitle: "Codes Scanned",
    secondBtn: "Filters",
  },
  create: {
    id: "create",
    title: "Create",
    subtitle: "Codes Created",
    secondBtn: "Create",
  },
};

export const BtnDelete = {
  delete: "Delete",
  cancel: "Cancel",
};
