import { AbstractVehicle as Vehicle, VehicleType } from "@vehicle-manager/api";
import faker from "faker";
import HttpStatus from "http-status-codes";
import request from "supertest";

import { app } from "../../index";

let vehicle: Vehicle;

beforeEach(() => {
  vehicle = createValidVehicle();
});

describe("vehicle endpoints", () => {
  it("should create a new vehicle", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .send(vehicle);

    expect(res.status).toEqual(HttpStatus.CREATED);
    expect(res.body).toMatchObject(vehicle);
  });

  it("should not create a new vehicle", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .send();

    expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
  });

  it("should fetch a vehicle", async () => {
    const { body: { _id: id } } = await request(app)
      .post("/api/vehicles")
      .send(vehicle);

    const res = await request(app)
      .get(`${"/api/vehicles"}/${id}`)
      .send();

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toMatchObject(vehicle);
  });

  it("should not fetch a vehicle", async () => {
    const res = await request(app)
      .get("/api/vehicles/-1")
      .send();

    expect(res.status).toEqual(HttpStatus.NOT_FOUND);
  });

  it("should fetch many vehicles", async () => {
    await request(app)
      .post("/api/vehicles")
      .send(vehicle);

    const res = await request(app)
      .get("/api/vehicles")
      .query(vehicle)
      .send();

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toMatchObject([vehicle]);
  });

  it("should update a vehicle", async () => {
    const { body: { _id: id } } = await request(app)
      .post("/api/vehicles")
      .send(vehicle);

    const color = vehicle.color + faker.random.uuid();

    const res = await request(app)
      .put(`/api/vehicles/${id}`)
      .send({ color });

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toMatchObject({ color });
  });

  it("should not update a vehicle", async () => {
    const res = await request(app)
      .put("/api/vehicles/-1")
      .send();

    expect(res.status).toEqual(HttpStatus.NOT_FOUND);
  });

  it("should delete a vehicle", async () => {
    const { body: { _id: id } } = await request(app)
      .post("/api/vehicles")
      .send(vehicle);

    const res = await request(app)
      .delete(`/api/vehicles/${id}`)
      .send();

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toMatchObject(vehicle);
  });

  it("should not delete a vehicle", async () => {
    const res = await request(app)
      .delete("/api/vehicles/-1")
      .send();

    expect(res.status).toEqual(HttpStatus.NOT_FOUND);
  });

});

function createValidVehicle(): Vehicle {
  return {
    chassisSeries: faker.random.uuid(),
    chassisNumber: faker.random.number(),
    type: VehicleType.BUS,
    color: faker.random.uuid(),
  };
}
