import { HistoryData } from "@/types/types";
import {
  database,
  initDatabaseCreateHistory,
} from "@/functions/sql/openDatabase";

export async function saveCreateQrHistory(data: HistoryData) {
  try {
    const { value, type, typeCode, titleName, date } = data;

    const result = await database.runAsync(
      "INSERT INTO createQrHistory (date,value, type, typeCode ,titleName) VALUES (?, ?, ?,?, ?);",
      [date, value, type, typeCode, titleName!]
    );

    console.log("savedCreateQr!, id: ", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.log("saveCreateQrHistory", error);
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
