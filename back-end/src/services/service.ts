import { Model } from "@vehicle-manager/api";

export abstract class BaseCrudService<T extends Model> {
  public abstract async create(entity: T): Promise<T>;

  public abstract async read(id: number): Promise<T | null>;

  public abstract async find(args: any): Promise<any>;

  public abstract async update(id: number, entity: T): Promise<T>;

  public abstract async delete(id: number): Promise<T>;

  protected async beforeCreate(data: T): Promise<T> {
    return data;
  }

  protected async afterCreate(entity: T): Promise<T> {
    return entity;
  }

  protected async beforeUpdate(before: T, data: T): Promise<T> {
    return data;
  }

  protected async afterUpdate(before: T, data: T): Promise<T> {
    return { ...before, ...data };
  }

  protected async beforeDelete(entity: T): Promise<void> {
    return void 0;
  }

  protected async afterDelete(entity: T): Promise<void> {
    return void 0;
  }
}
