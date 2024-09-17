import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabaseSync("database.db");

export function initDatabaseQrHistory() {
  try {
    const res = database.getFirstSync(`
          SELECT name 
          FROM sqlite_master 
          WHERE type='table' AND name='qrhistory';
        `);
    if (!res) {
      database.execSync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS qrhistory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            value TEXT NOT NULL,
            type TEXT NOT NULL,
            typeCode TEXT NOT NULL,
            titleName TEXT
          );
          INSERT INTO qrhistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:51:45 AM', '+1234567890', 'number', '256','TEL:+1234567890');
          INSERT INTO qrhistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:46:58 AM', 'google', 'web', '256','https://www.google.com');
          INSERT INTO qrhistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:50:30 AM', 'example@email.com', 'email', '256','MATMSG:TO:example@email.com;SUB:example;BODY:hi, how are you;');
          INSERT INTO qrhistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:59:33 AM', 'example text', 'sms', '256', 'SMSTO:+1234567890:example text');
          INSERT INTO qrhistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:45:19 AM', 'red example', 'wifi', '256','WIFI:S:red example;T:WPA;P:12345678;H:false;;');
        `);
    }
  } catch (error) {
    console.error("initDatabaseQrHistory", error);
  }
}

export function initDatabaseCreateHistory() {
  try {
    const res = database.getFirstSync(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name='createQrHistory';
      `);

    if (!res) {
      database.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS createQrHistory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date  TEXT NOT NULL,
          value TEXT NOT NULL,
          type TEXT NOT NULL,
          typeCode TEXT NOT NULL,
          titleName TEXT
          );
           INSERT INTO createQrHistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:51:45 AM', '+1234567890', 'number', '256','TEL:+1234567890');
          INSERT INTO createQrHistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:46:58 AM', 'google', 'web', '256','https://www.google.com');
          INSERT INTO createQrHistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:50:30 AM', 'example@email.com', 'email', '256','MATMSG:TO:example@email.com;SUB:example;BODY:hi, how are you;');
          INSERT INTO createQrHistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:59:33 AM', 'example text', 'sms', '256', 'SMSTO:+1234567890:example text');
          INSERT INTO createQrHistory (date, titleName, type, typeCode, value) VALUES ('9/10/2024, 10:45:19 AM', 'red example', 'wifi', '256','WIFI:S:red example;T:WPA;P:12345678;H:false;;');
        `);
    }
  } catch (error) {
    console.error("initDatabaseCreateHistory", error);
  }
}

export function initDatabaseSettings() {
  try {
    const res = database.getFirstSync(`
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name='settings';
      `);

    if (!res) {
      database.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          languages TEXT NOT NULL,
          sound BOOLEAN NOT NULL,
          vibrate BOOLEAN NOT NULL
        );
        INSERT INTO settings (languages, sound, vibrate) VALUES ('en', 0, 1);
      `);
    }
  } catch (error) {
    console.error("initDatabaseSettings", error);
  }
}
