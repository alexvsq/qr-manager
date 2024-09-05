import { WifiData, ContactData, EmailData, SMSData } from "@/types/types";
import * as Clipboard from "expo-clipboard";

export function shortenText(text: string, maxLength = 30) {
  const short =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  const result = short.replace(/\r?\n/g, " ");
  return result;
}

export function extractNameFromUrl(url: string): string {
  const regex = /:\/\/(?:www\.)?([^\.]+)\./;
  const match = url.match(regex);
  return match ? match[1] : url;
}

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

export const getContactData = (value: string): ContactData => {
  const nameMatch = value.match(/N:([^;]+);([^;]+)/);
  const fullNameMatch = value.match(/FN:(.+)/);
  const organizationMatch = value.match(/ORG:(.+)/);
  const titleMatch = value.match(/TITLE:(.+)/);
  const phoneMatch = value.match(/TEL;type=WORK:(\d+)/);

  return {
    name: nameMatch ? `${nameMatch[2]} ${nameMatch[1]}` : "",
    fullName: fullNameMatch ? fullNameMatch[1].trim() : "",
    organization: organizationMatch ? organizationMatch[1].trim() : "",
    title: titleMatch ? titleMatch[1].trim() : "",
    phone: phoneMatch ? phoneMatch[1].trim() : "",
  };
};

export const getEmailData = (value: string): EmailData => {
  const toMatch = value.match(/TO:([^;]+)/);
  const subjectMatch = value.match(/SUB:([^;]+)/);
  const bodyMatch = value.match(/BODY:([^;]+)/);

  return {
    to: toMatch ? toMatch[1].trim() : "",
    subject: subjectMatch ? subjectMatch[1].trim() : "",
    body: bodyMatch ? bodyMatch[1].trim() : "",
  };
};
export const getNumberData = (value: string): string => {
  const phoneMatch = value.match(/TEL:(\d+)/);
  return phoneMatch ? phoneMatch[1].trim() : "";
};

export const getSMSData = (value: string): SMSData => {
  const match = value.match(/SMSTO:(\d+):(.+)/);
  return {
    phoneNumber: match ? match[1].trim() : "",
    message: match ? match[2].trim() : "",
  };
};

export const copyToClipboard = async (text: string) => {
  try {
    await Clipboard.setStringAsync(text);
  } catch {
    alert("Error");
  }
};

/* 
"wifi";
"url";
"web";
"contact";
"number";
"email";
"sms";
*/
const imgCards = [
  {
    source: require("@assets/icons/icons-png/wifi.png"),
    title: "wifi",
  },
  {
    source: require("@assets/icons/icons-png/url.png"),
    title: "url",
  },
  {
    source: require("@assets/icons/icons-png/web.png"),
    title: "web",
  },
  {
    source: require("@assets/icons/icons-png/contact.png"),
    title: "contact",
  },
  {
    source: require("@assets/icons/icons-png/number.png"),
    title: "number",
  },
  {
    source: require("@assets/icons/icons-png/email.png"),
    title: "email",
  },
  {
    source: require("@assets/icons/icons-png/sms.png"),
    title: "sms",
  },
  {
    source: require("@assets/icons/icons-png/text.png"),
    title: "text",
  },
  {
    source: require("@assets/icons/icons-png/text.png"),
    title: "default",
  },
];
