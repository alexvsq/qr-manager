import { BarcodeScanningResult } from "expo-camera";
import {
  getWifiData,
  getContactData,
  getEmailData,
  getNumberData,
  getSMSData,
} from "@/functions/functions";
import { extractNameFromUrl } from "@/functions/functions";
import { HistoryData } from "@/types/types";

export const returnDataToSave = (data: BarcodeScanningResult): HistoryData => {
  console.log(data);
  const value = data.raw ? data.raw : data.data;
  const type = returnType(value);

  if (type === "web") return orderDataWeb(data);
  if (type === "wifi") return orderDataWifi(data);
  if (type === "url") return orderDataUrl(data);
  if (type === "text") return orderDataText(data);
  if (type === "contact") return orderDataContact(data);
  if (type === "email") return orderDataEmail(data);
  if (type === "number") return orderDataNumber(data);
  if (type === "sms") return orderDataSms(data);

  return orderDataText(data);
};

export const orderDataWifi = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;

  const wifiData = getWifiData(value);

  const dataToSave = {
    value: value,
    type: "wifi",
    typeCode: info.type,
    date: new Date().toLocaleString(),
    titleName: wifiData.name,
  };
  return dataToSave;
};

export const orderDataUrl = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;

  const titleName = extractNameFromUrl(value);
  const dataToSave = {
    value: value,
    type: "url",
    typeCode: info.type,
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataWeb = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;

  const titleName = extractNameFromUrl(value);
  const dataToSave = {
    value: value,
    type: "web",
    typeCode: info.type,
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataContact = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;
  const contactData = getContactData(value);
  const titleName =
    contactData.fullName.length > 0 ? contactData.fullName : value;

  const dataToSave = {
    value: value,
    type: "contact",
    typeCode: info.type,
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataSms = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;
  const smsData = getSMSData(value);
  const titleName = smsData.message.length > 0 ? smsData.message : value;
  const dataToSave = {
    value: value,
    type: "sms",
    typeCode: info.type,
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataEmail = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;
  const emailData = getEmailData(value);
  const titleName = emailData.to.length > 0 ? emailData.to : value;
  const dataToSave = {
    value: value,
    type: "email",
    typeCode: info.type,
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataNumber = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;
  const numberData = getNumberData(value);
  const titleName = numberData.length > 0 ? numberData : value;
  const dataToSave = {
    value: value,
    type: "number",
    typeCode: info.type,
    date: new Date().toLocaleString(),
    titleName,
  };
  return dataToSave;
};

export const orderDataText = (info: BarcodeScanningResult): HistoryData => {
  const value = info.raw ? info.raw : info.data;
  const dataToSave = {
    value: value,
    type: "text",
    typeCode: info.type,
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
