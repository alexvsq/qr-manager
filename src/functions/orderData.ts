import {
  getWifiData,
  getContactData2,
  getEmailData,
  getNumberData,
  getSMSData,
} from "@/functions/functions";
import { extractNameFromUrl } from "@/functions/functions";
import { HistoryData } from "@/types/types";

export const returnDataToSave = (value: string): HistoryData => {
  const type = returnType(value);

  if (type === "web") return orderDataWeb(value);
  if (type === "wifi") return orderDataWifi(value);
  if (type === "url") return orderDataUrl(value);
  if (type === "text") return orderDataText(value);
  if (type === "contact") return orderDataContact(value);
  if (type === "email") return orderDataEmail(value);
  if (type === "number") return orderDataNumber(value);
  if (type === "sms") return orderDataSms(value);

  return orderDataText(value);
};

export const orderDataWifi = (value: string): HistoryData => {
  const wifiData = getWifiData(value);

  const dataToSave = {
    value: value,
    type: "wifi",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName: wifiData.name,
  };
  return dataToSave;
};

export const orderDataUrl = (value: string): HistoryData => {
  const titleName = extractNameFromUrl(value);
  const dataToSave = {
    value: value,
    type: "url",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataWeb = (value: string): HistoryData => {
  const titleName = extractNameFromUrl(value);
  const dataToSave = {
    value: value,
    type: "web",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataContact = (value: string): HistoryData => {
  const contactData = getContactData2(value);
  const titleName =
    contactData.fullName.length > 0 ? contactData.fullName : value;

  const dataToSave = {
    value: value,
    type: "contact",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataSms = (value: string): HistoryData => {
  const smsData = getSMSData(value);
  const titleName = smsData.message.length > 0 ? smsData.message : value;
  const dataToSave = {
    value: value,
    type: "sms",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataEmail = (value: string): HistoryData => {
  const emailData = getEmailData(value);
  const titleName = emailData.to.length > 0 ? emailData.to : value;
  const dataToSave = {
    value: value,
    type: "email",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataNumber = (value: string): HistoryData => {
  const numberData = getNumberData(value);
  const titleName = numberData.length > 0 ? numberData : value;
  const dataToSave = {
    value: value,
    type: "number",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataText = (value: string): HistoryData => {
  const dataToSave = {
    value: value,
    type: "text",
    typeCode: "256",
    date: new Date().toLocaleString(),
    titleName: value,
  };

  return dataToSave;
};

export function returnType(value: string) {
  if (value.startsWith("http")) return "web";
  if (value.startsWith("WIFI:")) return "wifi";
  if (value.includes("://") && !value.startsWith("http")) return "url";
  if (value.startsWith("TEL:")) return "number";
  if (value.startsWith("BEGIN:VCARD")) return "contact";
  if (value.startsWith("MATMSG:")) return "email";
  if (value.startsWith("SMSTO:")) return "sms";
  return "text";
}
