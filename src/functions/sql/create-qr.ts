import { HistoryData } from "@/types/types";
import {
  database,
  initDatabaseCreateHistory,
} from "@/functions/sql/openDatabase";

export async function saveCreateQrHistory(
  valueToSave: HistoryData
): Promise<HistoryData | null> {
  try {
    const { value, type, typeCode, titleName, date } = valueToSave;
    const typeCodeString = typeCode ? typeCode : "";
    const result = await database.runAsync(
      "INSERT INTO createQrHistory (date,value, type, typeCode ,titleName) VALUES (?, ?, ?,?, ?);",
      [date, value, type, typeCode, titleName!]
    );
    if (!result) return null;
    console.log("savedCreateQr!, id: ", result.lastInsertRowId);

    const newRow = {
      id: result.lastInsertRowId,
      date: date,
      value: value,
      type: type,
      typeCode: typeCodeString,
      titleName: titleName!,
    };

    return newRow;
  } catch (error) {
    console.log("saveCreateQrHistory", error);
    return null;
  }
}

export async function getAllDataSqlCreates() {
  try {
    initDatabaseCreateHistory();
    const result = await database.getAllAsync<HistoryData>(
      "SELECT * FROM createQrHistory"
    );
    return result;
  } catch (error) {
    console.error("getAllDataSqlCreates", error);
  }
}
export async function deleteOneRowCreates(id: number) {
  try {
    const idString = String(id);
    const res = await database.runAsync(
      `delete from createQrHistory where id = ?`,
      [idString]
    );
    console.log(res);
  } catch (error) {
    console.error("deleteOneRowCreates", error);
  }
}
