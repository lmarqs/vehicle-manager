import Database from "nedb";
import os from "os";
import path from "path";

import { Model } from "@vehicle-manager/api";

import * as env from "../../env";

export function createDatabase<T extends Model>(name: string) {
  if (!name) {
    throw new Error(`Database name can not be empty`);
  }

  const invalidChars = name.replace(/[a-zA-Z0-9-_]/g, "");

  if (invalidChars) {
    throw new Error(`Can not create database with name "${name}". Encountered invalid chars "${invalidChars}"`);
  }

  return new Database<T>({
    autoload: true,
    filename: path.join(os.homedir(), ".vehicle-manager", env.NODE_ENV, "db", `${name}.db`),
    inMemoryOnly: env.NODE_ENV === "test",
  });
}
