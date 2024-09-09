import { HistoryData } from "@/types/types";
import { database } from "@/functions/sql/openDatabase";

export async function saveCreateQrHistory(data: HistoryData) {
  try {
    initDatabaseCreateHistory();
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

function initDatabaseCreateHistory() {
  try {
    database.execSync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS createQrHistory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date  TEXT NOT NULL,
        value TEXT NOT NULL,
        type TEXT NOT NULL,
        typeCode TEXT NOT NULL,
        titleName TEXT
        );`);
  } catch (error) {
    console.error("initDatabaseCreateHistory", error);
  }
}
