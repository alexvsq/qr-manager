import { Linking, Platform } from "react-native";

export const OpenLink = async (link: string) => {
  try {
    const url = link;
    const suported = await Linking.canOpenURL(url);
    if (suported) {
      await Linking.openURL(url);
    } else {
      alert("Error");
    }
  } catch (error) {
    console.log("openLink", error);
  }
};
export const goToWifiSettings = async () => {
  try {
    if (Platform.OS === "android") {
      Linking.sendIntent("android.settings.WIFI_SETTINGS");
    } else if (Platform.OS === "ios") {
      Linking.openURL("App-Prefs:root=WIFI");
    }
  } catch (error) {
    console.log("goToWifiSettings", error);
  }
};
