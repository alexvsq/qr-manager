import { HistoryData } from "@/types/types";
import { database, initDatabaseQrHistory } from "@/functions/sql/openDatabase";

export async function saveDataQr(
  dataScanned: HistoryData
): Promise<HistoryData | null> {
  try {
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

export const saveNoteToSql = async (id: number, notes: string) => {
  try {
    // Verificar si la columna "notes" existe
    const columnCheck = await database.getAllAsync(
      `PRAGMA table_info(qrhistory);`
    );

    const columnExists = columnCheck.some((col: any) => col.name === "notes");

    // Si la columna no existe, agregarla
    if (!columnExists) {
      await database.runAsync(`ALTER TABLE qrhistory ADD COLUMN notes TEXT;`);
      console.log('Columna "notes" agregada');
    }

    // Actualizar la fila con el ID proporcionado
    const result = await database.runAsync(
      `UPDATE qrhistory SET notes = ? WHERE id = ?;`,
      [notes, id]
    );

    console.log("Nota guardada:", result.changes);
  } catch (error) {
    console.error("saveNoteToSql", error);
  }
};

export async function getOneRow(id: string): Promise<HistoryData | null> {
  try {
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
    const res = await database.runAsync(`drop table qrhistory`);
    console.log(res);
  } catch (error) {
    console.error("deleteAllData", error);
  }
}
