import Database from "nedb";
import { createDatabase } from "./utils";

it("createDatabase returns a nedb instance", () => {
  const db = createDatabase(`valid-database-name-${Date.now()}`);
  expect(db).toBeTruthy();
  expect(db).toBeInstanceOf(Database);
});

it("createDatabase thows error on invalid database name", () => {
  expect(() => createDatabase("")).toThrow();
  expect(() => createDatabase(".")).toThrow();
  expect(() => createDatabase("/")).toThrow();
  expect(() => createDatabase(";")).toThrow();
});
