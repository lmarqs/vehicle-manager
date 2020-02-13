import { Model, PersistedModel } from "@vehicle-manager/api";
import faker from "faker";

import { DatabaseCrudService } from "./database-service";
import { EntityNotFoundError } from "./service";
import { createDatabase } from "./utils";

const FAKE_MODEL = "FAKE_MODEL";

interface FakeModel extends Model {
  alphaNumeric?: string;
  number?: number;
  boolean?: boolean;
  object?: any;
  array?: any[];
  beforeCreate?: boolean;
  beforeUpdate?: boolean;
}

const db = createDatabase<FakeModel>(FAKE_MODEL);

class FakeService extends DatabaseCrudService<FakeModel> {
  constructor() {
    super(db);
  }

  public async beforeCreate(data: FakeModel) {
    return super.beforeCreate(data);
  }

  public async afterCreate(entity: PersistedModel<FakeModel>) {
    return super.afterCreate(entity);
  }

  public async beforeUpdate(before: PersistedModel<FakeModel>, data: FakeModel) {
    return super.beforeUpdate(before, data);
  }

  public async afterUpdate(before: PersistedModel<FakeModel>, data: FakeModel) {
    return super.afterUpdate(before, data);
  }

  public async beforeDelete(entity: PersistedModel<FakeModel>) {
    return super.beforeDelete(entity);
  }

  public async afterDelete(entity: PersistedModel<FakeModel>) {
    return super.afterDelete(entity);
  }
}

let service: FakeService;

beforeEach(() => {
  service = new FakeService();
});

describe("create", () => {
  it("can create an entity with success", async () => {
    const data = createFakeModel();

    const created = await service.create(data);

    expect(created._id).toBeTruthy();
    expect(created).toMatchObject({ _id: created._id, ...data });
  });

  it("beforeCreate hook is called and can change data", async () => {
    const hook = service.beforeCreate.bind(service);

    const wrappedHook = jest.fn((data) => {
      return hook({ ...data, beforeCreate: true });
    });

    service.beforeCreate = wrappedHook;

    const created = await service.create(createFakeModel());

    expect(wrappedHook.mock.calls.length).toBe(1);
    expect(created.beforeCreate).toBeTruthy();
  });

  it("afterCreate hook is called", async () => {
    const hook = service.afterCreate.bind(service);

    const wrappedHook = jest.fn((data) => {
      return hook({ ...data, afterCreate: true });
    });

    service.afterCreate = wrappedHook;

    await service.create(createFakeModel());

    expect(wrappedHook.mock.calls.length).toBe(1);
  });
});

describe("read", () => {
  it("can read an entity with success", async () => {
    const created = await service.create(createFakeModel());
    const readed = await service.read(created._id);

    expect(created).toStrictEqual(readed);
  });

  it("reading a non existing entity throws EntityNotFoundError", async () => {
    await expect(service.read("")).rejects.toThrowError(EntityNotFoundError);
  });
});

describe("find", () => {
  it("can find entities with success", async () => {
    const sorter = (a: PersistedModel<FakeModel>, b: PersistedModel<FakeModel>) => a._id > b._id ? 1 : -1;
    const data = createFakeModel();

    const models = await Promise.all([
      service.create(data),
      service.create(data),
      service.create(data),
      service.create(data),
      service.create(data),
    ]);

    const found = await service.find(data);

    expect(found.sort(sorter)).toStrictEqual(models.sort(sorter));
  });
});

describe("update", () => {
  it("can update an entity with success", async () => {
    const created = await service.create({ ...createFakeModel(), alphaNumeric: "" });

    expect(created.alphaNumeric).toBeFalsy();

    const alphaNumeric = faker.random.alphaNumeric();

    const updated = await service.update(created._id, { alphaNumeric });

    expect(updated).toStrictEqual({ ...created, alphaNumeric });
  });

  it("beforeUpdate hook is called and can change data", async () => {
    const hook = service.beforeUpdate.bind(service);

    const wrappedHook = jest.fn((before, data) => {
      return hook(before, { ...data, beforeUpdate: true });
    });

    service.beforeUpdate = wrappedHook;

    const created = await service.create(createFakeModel());
    const updated = await service.update(created._id, {});

    expect(wrappedHook.mock.calls.length).toBe(1);
    expect(updated.beforeUpdate).toBeTruthy();
  });

  it("afterUpdate hook is called", async () => {
    const hook = service.afterUpdate.bind(service);

    const wrappedHook = jest.fn((before, data) => {
      return hook(before, data);
    });

    service.afterUpdate = wrappedHook;

    const created = await service.create(createFakeModel());
    await service.update(created._id, {});

    expect(wrappedHook.mock.calls.length).toBe(1);
  });

  it("updating a non existing entity throws error", async () => {
    await expect(service.update("", createFakeModel())).rejects.toThrowError();
  });
});

describe("delete", () => {
  it("can delete an entity with success", async () => {
    const created = await service.create(createFakeModel());
    const deleted = await service.delete(created._id);

    expect(created).toStrictEqual(deleted);
  });

  it("beforeDelete hook is called", async () => {
    const hook = service.beforeDelete.bind(service);

    const wrappedHook = jest.fn((entity) => {
      return hook(entity);
    });

    service.beforeDelete = wrappedHook;

    const created = await service.create(createFakeModel());
    await service.delete(created._id);

    expect(wrappedHook.mock.calls.length).toBe(1);
  });

  it("afterDelete hook is called", async () => {
    const hook = service.afterDelete.bind(service);

    const wrappedHook = jest.fn((entity) => {
      return hook(entity);
    });

    service.afterDelete = wrappedHook;

    const created = await service.create(createFakeModel());
    await service.delete(created._id);

    expect(wrappedHook.mock.calls.length).toBe(1);
  });

  it("deleting a non existing entity throws EntityNotFoundError", async () => {
    await expect(service.delete("")).rejects.toThrowError(EntityNotFoundError);
  });
});

function createFakeModel(): FakeModel {
  return {
    alphaNumeric: faker.random.alphaNumeric(),
    number: faker.random.number(),
    boolean: faker.random.boolean(),
    object: faker.random.objectElement(),
    array: [faker.random.arrayElement()],
  };
}
