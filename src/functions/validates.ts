import { BarcodeScanningResult } from "expo-camera";
import { saveDataQr } from "@/functions/sql-functions";
import { OpenLink } from "@/functions/Camera-Functions";
import { getWifiData } from "@/functions/functions";
import { router } from "expo-router";
import { extractNameFromUrl } from "@/functions/functions";

export async function validateANDSaveAndRun(data: BarcodeScanningResult) {
  try {
    const value = data.raw ? data.raw : data.data;
    console.log(data);

    if (value.includes("://")) {
      await withUrl(data);
    } else if (value.startsWith("WIFI")) {
      await withWifi(data);
    } else {
      await withText(data);
    }
  } catch (error) {
    console.log("validateANDSaveAndRun", error);
  }
}

async function withWifi(info: BarcodeScanningResult) {
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
    const id = await saveDataQr(dataToSave);

    router.push("/page-codeHistory/" + id);
  } catch (error) {
    console.log("withWifi", error);
  }
}
async function withUrl(info: BarcodeScanningResult) {
  try {
    const value = info.raw ? info.raw : info.data;
    OpenLink(value);

    const titleName = extractNameFromUrl(value);
    const dataToSave = {
      value: value,
      type: "url",
      typeCode: info.type,
      date: new Date().toLocaleString(),
      titleName,
    };

    await saveDataQr(dataToSave);
  } catch (error) {
    console.log("withUrl", error);
  }
}

async function withText(info: BarcodeScanningResult) {
  try {
    const value = info.raw ? info.raw : info.data;
    const dataToSave = {
      value: value,
      type: "text",
      typeCode: info.type,
      date: new Date().toLocaleString(),
      titleName: value,
    };

    await saveDataQr(dataToSave);
  } catch (error) {
    console.log("withText", error);
  }
}
