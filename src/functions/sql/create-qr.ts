import * as SQLite from "expo-sqlite";
import { HistoryData } from "@/types/types";

export async function saveCreateQrHistory(data: HistoryData) {
  try {
    const db = initDatabaseCreateHistory();
    const { value, type, typeCode, titleName, date } = data;

    const result = await db.runAsync(
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
    const db = initDatabaseCreateHistory();
    const result = await db.getAllAsync<HistoryData>(
      "SELECT * FROM createQrHistory"
    );
    return result;
  } catch (error) {
    console.error("getAllDataSqlCreates", error);
  }
}

function initDatabaseCreateHistory() {
  const db = SQLite.openDatabaseSync("database.db");
  db.execSync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS createQrHistory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date  TEXT NOT NULL,
        value TEXT NOT NULL,
        type TEXT NOT NULL,
        typeCode TEXT NOT NULL,
        titleName TEXT
        );`);

  return db;
}
