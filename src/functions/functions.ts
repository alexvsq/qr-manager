import { WifiData } from "@/types/types";
export function extractNameFromUrl(url: string): string {
  const regex = /:\/\/(?:www\.)?([^\.]+)\./;
  const match = url.match(regex);
  return match ? match[1] : url;
}

const imgCards = [
  {
    source: require("@assets/icons/icons-png/wifi.png"),
    title: "wifi",
  },
  {
    source: require("@assets/icons/icons-png/text.png"),
    title: "text",
  },
  {
    source: require("@assets/icons/icons-png/web.png"),
    title: "url",
  },
  {
    source: require("@assets/icons/icons-png/contact.png"),
    title: "contact",
  },
  {
    source: require("@assets/icons/icons-png/image.png"),
    title: "image",
  },
  {
    source: require("@assets/icons/icons-png/text.png"),
    title: "default",
  },
];

export const returnSource = (type: string) => {
  const source = imgCards.find((item) => item.title === type);
  if (!source) return require("@assets/icons/icons-png/text.png");
  return source?.source;
};

export const getWifiData = (data: string): WifiData => {
  //WIFI:S:REPETIDOR GERARDO;T:WPA;P:10400494;H:false;;
  data = data.replace("WIFI:", "");
  const wifiData = data.split(";");
  const name = wifiData[0].replace("S:", "");
  const password = wifiData[2].replace("P:", "");
  const security = wifiData[1].replace("T:", "");
  const hidden = wifiData[3].replace("H:", "");
  return { name, password, security, hidden };
};
