import Database from "better-sqlite3";

export const db = new Database("db/baggr.db");

db.pragma("journal_mode = WAL");
