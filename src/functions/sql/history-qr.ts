import * as SQLite from "expo-sqlite";
import { HistoryData } from "@/types/types";

export async function saveDataQr(
  dataScanned: HistoryData
): Promise<HistoryData | null> {
  try {
    const db = initDatabaseQrHistory();
    const { value, type, typeCode, titleName, date } = dataScanned;
    const typeCodeString = typeCode ? typeCode : "";
    const data = value;
    const result = await db.runAsync(
      "INSERT INTO qrhistory (date,value, type, typeCode, titleName) VALUES (?, ?, ?, ?, ?);",
      [date, data, type, typeCodeString, titleName!]
    );
    console.log("saved! , id: ", result.lastInsertRowId);

    const newRow = {
      id: result.lastInsertRowId,
      date: date,
      value: data,
      type: type,
      typeCode: typeCodeString,
      titleName: titleName!,
    };
    return newRow;
  } catch (error) {
    console.log("saveDataQr", error);
    return null;
  }
}
export async function getOneRow(id: string): Promise<HistoryData | null> {
  try {
    const db = initDatabaseQrHistory();
    const row = await db.getFirstAsync<HistoryData | null>(
      "SELECT * FROM qrhistory WHERE id = ?",
      [id]
    );

    if (!row) {
      return null;
    }
    return row;
  } catch (error) {
    console.error("getOneRow", error);
    return null;
  }
}

export async function deleteOneRow(id: number) {
  try {
    const idString = String(id);
    const db = initDatabaseQrHistory();
    const res = await db.runAsync(`delete from qrhistory where id = ?`, [
      idString,
    ]);
    console.log(res);
  } catch (error) {
    console.log("deleteOneRow", error);
  }
}

export async function getAllDataSqlHistory() {
  try {
    const db = initDatabaseQrHistory();
    const result = await db.getAllAsync<HistoryData>("SELECT * FROM qrhistory");
    return result;
  } catch (error) {
    console.error("getAllDataSqlHistory", error);
  }
}

export async function deleteAllData() {
  try {
    const db = initDatabaseQrHistory();
    const res = await db.runAsync(`drop table qrhistory`);
    console.log(res);
  } catch (error) {
    console.log("deleteAllData", error);
  }
}

function initDatabaseQrHistory() {
  const db = SQLite.openDatabaseSync("database.db");
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS qrhistory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date  TEXT NOT NULL,
      value TEXT NOT NULL,
      type TEXT NOT NULL,
      typeCode TEXT NOT NULL,
      titleName TEXT
      );`);

  return db;
}
