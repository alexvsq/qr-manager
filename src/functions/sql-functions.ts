import * as SQLite from "expo-sqlite";
import { HistoryData } from "@/types/types";

export async function saveDataQr(dataScanned: HistoryData) {
  try {
    const { value, type, typeCode, titleName, date } = dataScanned;
    const data = value;
    const db = await initDatabase();
    const result = await db.runAsync(
      "INSERT INTO qrhistory (date,value, type, typeCode, titleName) VALUES (?, ?, ?, ?, ?);",
      [date, data, type, typeCode, titleName!]
    );
    console.log("saved! , id: ", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.log("saveDataQr", error);
  }
}
export async function getOneRow(id: string): Promise<HistoryData | null> {
  try {
    const db = await initDatabase();
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
    const db = await initDatabase();
    const res = await db.runAsync(`delete from qrhistory where id = ?`, [
      idString,
    ]);
    console.log(res);
  } catch (error) {
    console.log("deleteOneRow", error);
  }
}

export async function getAllDataSql() {
  try {
    const db = await initDatabase();
    const result = await db.getAllAsync<HistoryData>("SELECT * FROM qrhistory");
    return result;
  } catch (error) {
    console.error("getDataSql error:", error);
  }
}

export async function deleteAllData() {
  try {
    const db = await initDatabase();
    const res = await db.runAsync(`drop table qrhistory`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

async function initDatabase() {
  const db = await SQLite.openDatabaseAsync("database.db");
  await db.execAsync(`
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
