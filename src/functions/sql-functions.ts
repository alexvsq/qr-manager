import * as SQLite from "expo-sqlite";
import { HistoryData } from "@/types/types";

async function initDatabase() {
  const db = await SQLite.openDatabaseAsync("database.db");
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS qrhistory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date  TEXT NOT NULL,
      value TEXT NOT NULL,
      type TEXT NOT NULL,
      typeCode TEXT NOT NULL
      );
      `);
  return db;
}

export async function saveDataQr(data: string, type: string, typeCode: string) {
  try {
    const db = await initDatabase();
    const date = new Date().toLocaleString();
    const result = await db.runAsync(
      "INSERT INTO qrhistory (date,value, type, typeCode) VALUES (?, ?, ?, ?);",
      [date, data, type, typeCode]
    );
    console.log(result);
  } catch (error) {
    console.log("saveDataQr", error);
  }
}
export async function getOneRow(id: string): Promise<HistoryData | null> {
  try {
    const db = await SQLite.openDatabaseAsync("database.db");
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
    const db = await SQLite.openDatabaseAsync("database.db");
    const result = await db.getAllAsync<HistoryData>("SELECT * FROM qrhistory");
    if (result.length === 0) {
      return [];
    }
    return result;
  } catch (error) {
    console.error("getDataSql error:", error);
    return [];
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
