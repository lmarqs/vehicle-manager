import { Model, PersistedModel } from "@vehicle-manager/api";

import { BaseCrudService } from "./service";
import Database from "nedb";


export abstract class DatabaseCrudService<T extends Model> extends BaseCrudService<T> {
  constructor(private db: Database<T>) {
    super();
  }

  public async create(...[rawData]: Parameters<BaseCrudService<T>["create"]>): ReturnType<BaseCrudService<T>["create"]> {
    const data = await this.beforeCreate(rawData);

    return new Promise((resolve, reject) => {

      this.db.insert(data, async (err, doc) => {
        const after = await this.afterCreate(doc as T & Required<Pick<T, "_id">>);

        resolve(after);
      });

    });
  }

  public async read(...[_id]: Parameters<BaseCrudService<T>["read"]>): ReturnType<BaseCrudService<T>["read"]> {
    return new Promise((resolve, reject) => {

      this.db.findOne({ _id }, async (err, doc) => {
        resolve(doc);
      });

    });
  }

  public async find(query: any): ReturnType<BaseCrudService<T>["find"]> {

    return new Promise((resolve) => {

      this.db.find(query, (err, docs) => {
        resolve(docs);
      });

    });
  }

  public async update(...[_id, rawData]: Parameters<BaseCrudService<T>["update"]>): ReturnType<BaseCrudService<T>["update"]> {
    const before: T | null = await this.read(_id);

    if (!before) {
      throw new Error();
    }

    const data = await this.beforeUpdate(before, rawData);

    return new Promise((resolve, reject) => {

      this.db.update({ _id }, data, {}, async (err) => {
        const doc = await this.afterUpdate(before, data);
        resolve(doc);
      });

    });

  }

  public async delete(...[_id]: Parameters<BaseCrudService<T>["delete"]>): ReturnType<BaseCrudService<T>["delete"]> {
    const entity = await this.read(_id);

    if (!entity) {
      throw new Error();
    }

    await this.beforeDelete(entity);

    return new Promise(async (resolve, reject) => {

      this.db.remove({ _id }, {}, async (err) => {
        await this.afterDelete(entity);
        resolve(entity);
      });

    });
  }
}
