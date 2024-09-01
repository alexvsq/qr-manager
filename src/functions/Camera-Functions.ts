import { Linking, Platform } from "react-native";

export const getWifiData = (data: string): object => {
  //WIFI:S:REPETIDOR GERARDO;T:WPA;P:10400494;H:false;;
  data = data.replace("WIFI:", "");
  const wifiData = data.split(";");
  const name = wifiData[0].replace("S:", "");
  const password = wifiData[2].replace("P:", "");
  const security = wifiData[1].replace("T:", "");
  const hidden = wifiData[3].replace("H:", "");
  return { name, password, security, hidden };
};
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
