import { database, initDatabaseSettings } from "@/functions/sql/openDatabase";
import { SettingsDataSql } from "@/types/types";

export async function getDataSettings(): Promise<SettingsDataSql | null> {
  try {
    initDatabaseSettings();
    const result = await database.getAllAsync<SettingsDataSql>(
      `SELECT * FROM settings;`
    );
    return result[0];
  } catch (error) {
    console.error("getDataSettings", error);
    return null;
  }
}

export async function saveVibrate(value: boolean) {
  try {
    const bool = value ? 1 : 0;

    const res = await database.runAsync(
      `UPDATE settings SET vibrate = ? WHERE id = 1;`,
      [bool]
    );
    console.log(res);
  } catch (error) {
    console.error("saveVibrate", error);
  }
}

export async function saveSound(value: boolean) {
  try {
    const bool = value ? 1 : 0;
    const res = await database.runAsync(
      `UPDATE settings SET sound = ? WHERE id = 1;`,
      [bool]
    );
    console.log(res);
  } catch (error) {
    console.error("saveSound", error);
  }
}
