import { BarcodeScanningResult } from "expo-camera";
import { saveDataQr } from "@/functions/sql-functions";
import { OpenLink } from "@/functions/Camera-Functions";

export function validateANDSave(data: BarcodeScanningResult) {
  const value = data.raw ? data.raw : data.data;
  console.log(data);
  if (value.includes("://")) {
    saveDataQr(value, "url", data.type);
  } else if (value.startsWith("WIFI")) {
    saveDataQr(value, "wifi", data.type);
  } else {
    saveDataQr(value, "text", data.type);
  }
}
