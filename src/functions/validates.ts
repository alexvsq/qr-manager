import { BarcodeScanningResult } from "expo-camera";
import { saveCreateQrHistory } from "@/functions/sql/create-qr";
import { saveDataQr } from "@/functions/sql/history-qr";
import { returnDataToSave } from "@/functions/orderData";
import { HistoryData } from "@/types/types";

export async function validateANDSave(
  data: BarcodeScanningResult
): Promise<HistoryData | null> {
  if (!data.data && !data.raw) return null;
  try {
    const value = data.raw ? data.raw : data.data;

    const dataToSave = returnDataToSave(value!);
    console.log(dataToSave);
    const newRow = await saveDataQr(dataToSave);
    if (newRow) return newRow;
    return null;
  } catch (error) {
    console.log("validateANDSave", error);
    return null;
  }
}

export async function validateANDSaveCreateQR(value: string) {
  try {
    console.log("validateANDSaveCreateQR", value);

    const dataToSave = returnDataToSave(value);

    const resultId = await saveCreateQrHistory(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("validateANDSave", error);
  }
}
