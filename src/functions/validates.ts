import { BarcodeScanningResult } from "expo-camera";
import { saveCreateQrHistory } from "@/functions/sql/create-qr";
import { saveDataQr } from "@/functions/sql/history-qr";
import { returnDataToSave } from "@/functions/orderData";

export async function validateANDSave(data: BarcodeScanningResult) {
  if (!data.data && !data.raw) return;
  try {
    console.log(data);
    const value = data.data ? data.data : data.raw;

    const dataToSave = returnDataToSave(value!);

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("validateANDSave", error);
  }
}

export async function validateANDSaveCreateQR(value: string) {
  try {
    console.log(value);

    const dataToSave = returnDataToSave(value);

    const resultId = await saveCreateQrHistory(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("validateANDSave", error);
  }
}
