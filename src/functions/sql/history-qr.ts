import { HistoryData } from "@/types/types";
import { database } from "@/functions/sql/openDatabase";

export async function saveDataQr(
  dataScanned: HistoryData
): Promise<HistoryData | null> {
  try {
    initDatabaseQrHistory();
    const { value, type, typeCode, titleName, date } = dataScanned;
    const typeCodeString = typeCode ? typeCode : "";
    const data = value;
    const result = await database?.runAsync(
      "INSERT INTO qrhistory (date,value, type, typeCode, titleName) VALUES (?, ?, ?, ?, ?);",
      [date, data, type, typeCodeString, titleName!]
    );
    if (!result) return null;
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
    console.error("saveDataQr", error);
    return null;
  }
}
export async function getOneRow(id: string): Promise<HistoryData | null> {
  try {
    initDatabaseQrHistory();
    const row = await database.getFirstAsync<HistoryData | null>(
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
    initDatabaseQrHistory();
    const res = await database.runAsync(`delete from qrhistory where id = ?`, [
      idString,
    ]);
    console.log(res);
  } catch (error) {
    console.error("deleteOneRow", error);
  }
}

export async function getAllDataSqlHistory() {
  try {
    initDatabaseQrHistory();
    const result = database.getAllAsync<HistoryData>("SELECT * FROM qrhistory");
    return result;
  } catch (error) {
    console.error("getAllDataSqlHistory", error);
  }
}

export async function deleteAllData() {
  try {
    initDatabaseQrHistory();
    const res = await database.runAsync(`drop table qrhistory`);
    console.log(res);
  } catch (error) {
    console.error("deleteAllData", error);
  }
}

function initDatabaseQrHistory() {
  try {
    database.execSync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS qrhistory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date  TEXT NOT NULL,
        value TEXT NOT NULL,
        type TEXT NOT NULL,
        typeCode TEXT NOT NULL,
        titleName TEXT
        );`);
  } catch (error) {
    console.error("initDatabaseQrHistory", error);
  }
}
