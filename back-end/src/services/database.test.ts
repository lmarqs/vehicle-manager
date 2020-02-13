import { Model, PersistedModel } from "@vehicle-manager/api";
import faker from "faker";

import { DatabaseCrudService } from "./database";
import { createDatabase } from "./utils";

const FAKE_MODEL = "FAKE_MODEL";

interface FakeModel extends Model {
  alphaNumeric?: string;
  number?: number;
  boolean?: boolean;
  object?: any;
  array?: any[];
}

const db = createDatabase<FakeModel>(FAKE_MODEL);

class Service extends DatabaseCrudService<FakeModel> {
  constructor() {
    super(db);
  }
}

const service = new Service();

it('Create', async () => {
  const data = createFakeModel();

  const created = await service.create(data);

  expect(created._id).toBeTruthy();
  expect(created).toStrictEqual({ _id: created._id, ...data });
});

it('Read', async () => {
  const created = await service.create(createFakeModel());
  const readed = await service.read(created._id);

  expect(created).toStrictEqual(readed);
});

it('Find', async () => {
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

it('Update with success', async () => {
  const created = await service.create({ ...createFakeModel(), alphaNumeric: "" });

  expect(created.alphaNumeric).toBeFalsy();

  if (!created._id) {
    throw new Error();
  }

  const alphaNumeric = faker.random.alphaNumeric();

  const updated = await service.update(created._id, { alphaNumeric });

  expect(updated).toStrictEqual({ ...created, alphaNumeric });
});

it('Update non existing throws error', async () => {
  await expect(service.update("", createFakeModel())).rejects.toThrowError();
});

it('Delete with success', async () => {
  const created = await service.create(createFakeModel());
  const deleted = await service.delete(created._id);
  const readed = await service.read(created._id);

  expect(created).toStrictEqual(deleted);
  expect(readed).toBeFalsy();
});

it('Delete non existing throws error', async () => {
  await expect(service.delete("")).rejects.toThrowError();
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
