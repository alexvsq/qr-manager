import { BarcodeScanningResult } from "expo-camera";
import { saveDataQr } from "@/functions/sql-functions";
import { returnDataToSave } from "@/functions/orderData";

export async function validateANDSave(data: BarcodeScanningResult) {
  if (!data.data && !data.raw) return;
  try {
    console.log(data);

    const dataToSave = returnDataToSave(data);

    const resultId = await saveDataQr(dataToSave);
    if (resultId) return resultId;
  } catch (error) {
    console.log("validateANDSave", error);
  }
}
