import { Model, PersistedModel } from "@vehicle-manager/api";

import { BaseCrudService, EntityNotFoundError } from "./service";
import Database from "nedb";


export abstract class DatabaseCrudService<T extends Model> extends BaseCrudService<T> {
  constructor(private db: Database<T>) {
    super();
  }

  public async create(...[rawData]: Parameters<BaseCrudService<T>["create"]>): ReturnType<BaseCrudService<T>["create"]> {
    const data = await this.beforeCreate(rawData);

    return new Promise((resolve, reject) => {

      this.db.insert(data, async (err, doc) => {
        const entity = doc as PersistedModel<T>;
        this.afterCreate(entity);
        resolve(entity);
      });

    });
  }

  public async read(...[_id]: Parameters<BaseCrudService<T>["read"]>): ReturnType<BaseCrudService<T>["read"]> {
    return new Promise((resolve, reject) => {

      this.db.findOne({ _id }, async (err, doc) => {
        if (!doc) {
          reject(new EntityNotFoundError());
        }
        const entity = doc as PersistedModel<T>;
        resolve(entity);
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
    const before = await this.read(_id);

    const data = await this.beforeUpdate(before, rawData);

    return new Promise((resolve, reject) => {

      this.db.update({ _id }, data, {}, async (err) => {
        this.afterUpdate(before, data);
        resolve({ ...before, ...data });
      });

    });

  }

  public async delete(...[_id]: Parameters<BaseCrudService<T>["delete"]>): ReturnType<BaseCrudService<T>["delete"]> {
    const entity = await this.read(_id);

    await this.beforeDelete(entity);

    return new Promise(async (resolve, reject) => {

      this.db.remove({ _id }, {}, async (err) => {
        await this.afterDelete(entity);
        resolve(entity);
      });

    });
  }
}
