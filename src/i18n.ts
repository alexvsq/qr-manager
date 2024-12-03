import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      details: "Details",
      createQr: "Create Qr",
      settings: "Settings",
      scanTitle: "Scanner",
      ScanSubtitle: "Scan a Qr Code",
      historyTitle: "History",
      historySubtitle: "Codes Scanned",
      createTitle: "Create",
      createSubtitle: "Codes Created",
      Lenguajes: "Languages",
      scan: "Scan",
      Sound: "Sound",
      Vibrate: "Vibrate",
      feedback: "Feedback",
      talkWhithUs: "Talk with us",
      contactUs: "Contact us",
    },
  },
  es: {
    translation: {
      scanTitle: "Escanner",
      ScanSubtitle: "Escanear un código QR",
      historyTitle: "Historial",
      historySubtitle: "Códigos escaneados",
      createTitle: "Crear",
      createSubtitle: "Códigos creados",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
