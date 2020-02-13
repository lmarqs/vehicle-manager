import { Model, PersistedModel } from "@vehicle-manager/api";

export abstract class BaseCrudService<T extends Model> {
  public abstract async create(entity: T): Promise<T & Required<Pick<T, "_id">>>;

  public abstract async read(id: PersistedModel<T>["_id"]): Promise<PersistedModel<T>>;

  public abstract async find(args: any): Promise<any>;

  public abstract async update(id: PersistedModel<T>["_id"], entity: T): Promise<T>;

  public abstract async delete(id: PersistedModel<T>["_id"]): Promise<T>;

  protected async beforeCreate(data: T): Promise<T> {
    return data;
  }

  protected async afterCreate(entity: PersistedModel<T>): Promise<void> {
    return void 0;
  }

  protected async beforeUpdate(before: PersistedModel<T>, data: T): Promise<T> {
    return data;
  }

  protected async afterUpdate(before: PersistedModel<T>, data: T): Promise<void> {
    return void 0;
  }

  protected async beforeDelete(entity: PersistedModel<T>): Promise<void> {
    return void 0;
  }

  protected async afterDelete(entity: PersistedModel<T>): Promise<void> {
    return void 0;
  }
}

export class EntityNotFoundError extends Error {
  constructor() {
    super("EntityNotFoundError");
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, EntityNotFoundError.prototype);
  }
}
