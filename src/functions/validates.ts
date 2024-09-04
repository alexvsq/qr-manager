import { BarcodeScanningResult } from "expo-camera";
import { saveDataQr } from "@/functions/sql-functions";
import {
  getWifiData,
  getContactData,
  getEmailData,
  getNumberData,
  getSMSData,
} from "@/functions/functions";
import { extractNameFromUrl } from "@/functions/functions";

export async function validateANDSave(data: BarcodeScanningResult) {
  if (!data.data && !data.raw) return;
  try {
    console.log(data);
    const value = data.raw ? data.raw : data.data;
    const type = returnType(value);

    if (type === "web") return await withWeb(data);
    if (type === "wifi") return await withWifi(data);
    if (type === "url") return await withUrl(data);
    if (type === "text") return await withText(data);
    if (type === "contact") return await withContact(data);
    if (type === "email") return await withEmail(data);
    if (type === "number") return await withNumber(data);
    if (type === "sms") return await withSMS(data);
  } catch (error) {
    console.log("validateANDSave", error);
  }
}

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

async function withWifi(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
    const value = info.raw ? info.raw : info.data;

    const wifiData = getWifiData(value);

    const dataToSave = {
      value: value,
      type: "wifi",
      typeCode: info.type,
      date: new Date().toLocaleString(),
      titleName: wifiData.name,
    };
    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("withWifi", error);
  }
}
async function withUrl(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
    const value = info.raw ? info.raw : info.data;

    const titleName = extractNameFromUrl(value);
    const dataToSave = {
      value: value,
      type: "url",
      typeCode: info.type,
      date: new Date().toLocaleString(),
      titleName,
    };

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("withUrl", error);
  }
}

async function withWeb(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
    const value = info.raw ? info.raw : info.data;

    const titleName = extractNameFromUrl(value);
    const dataToSave = {
      value: value,
      type: "web",
      typeCode: info.type,
      date: new Date().toLocaleString(),
      titleName,
    };

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("withUrl", error);
  }
}

async function withContact(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
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

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("withContact", error);
  }
}

async function withEmail(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
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

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("withEmail", error);
  }
}

async function withNumber(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
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

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {}
}

async function withSMS(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
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

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("withSMS", error);
  }
}

async function withText(
  info: BarcodeScanningResult
): Promise<number | undefined> {
  try {
    const value = info.raw ? info.raw : info.data;
    const dataToSave = {
      value: value,
      type: "text",
      typeCode: info.type,
      date: new Date().toLocaleString(),
      titleName: value,
    };

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("withText", error);
  }
}
