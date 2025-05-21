import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "calculator.db";
const database_version = "1.0";
const database_displayname = "Calculator SQLite Database";
const database_size = 200000;

let db;

export const initDB = async () => {
  if (db) {
    return db;
  }
  try {
    db = await SQLite.openDatabase({ name: database_name, location: 'default' });

    console.log("Database opened");
    return db;
  } catch (error) {
    console.log("Error opening database:", error);
    throw error;
  }
};

export const createTable = async () => {
  try {
    const database = await initDB();
    await database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          expression TEXT NOT NULL,
          result TEXT NOT NULL
        );`,
        [],
        () => {
          console.log("Table created or already exists");
        },
        (tx, error) => {
          console.log("Error creating table:", error);
          return false; // rollback transaction
        }
      );
    });
  } catch (error) {
    console.log("createTable error:", error);
  }
};

export const insertHistory = async (expression, result) => {
  try {
    const database = await initDB();
    await database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO history (expression, result) VALUES (?, ?);',
        [expression, result],
        () => {
          console.log("Inserted history:", expression, result);
        },
        (tx, error) => {
          console.log("Error inserting history:", error);
          return false;
        }
      );
    });
  } catch (error) {
    console.log("insertHistory error:", error);
  }
};
