import { AbstractVehicle, VehicleType } from "@vehicle-manager/api";
import { ValidationError } from "./validation";
import { vehicleService } from "./vehicle";

import faker from "faker";

let vehicle: AbstractVehicle;

beforeEach(() => {
  vehicle = createValidVehicle();
});

describe("Vehicle creation", () => {
  it("can create a valid vehicle", async () => {
    vehicle = await vehicleService.create(vehicle);
    expect(vehicle).toBeTruthy();
  });

  it("chassisId must be unique", async () => {
    await vehicleService.create(vehicle);
    await expect(vehicleService.create(vehicle)).rejects.toThrowError();
  });

  it("trucks must have numberOfPassengers = 1", async () => {
    vehicle = { ...vehicle, type: VehicleType.TRUCK };
    vehicle = await vehicleService.create(vehicle);
    expect(vehicle.numberOfPassengers).toBe(1);
  });

  it("buses must have numberOfPassengers = 42", async () => {
    vehicle = { ...vehicle, type: VehicleType.BUS };
    vehicle = await vehicleService.create(vehicle);
    expect(vehicle.numberOfPassengers).toBe(42);
  });

  it("cars must have numberOfPassengers = 4", async () => {
    vehicle = { ...vehicle, type: VehicleType.CAR };
    vehicle = await vehicleService.create(vehicle);
    expect(vehicle.numberOfPassengers).toBe(4);
  });

  it("vehicle must have a valid chassisSeries", async () => {
    await expect(vehicleService.create({ ...vehicle, chassisSeries: undefined }))
      .rejects.toThrowError(ValidationError);

    await expect(vehicleService.create({ ...vehicle, chassisSeries: "" }))
      .rejects.toThrowError(ValidationError);

    await expect(vehicleService.create({ ...vehicle, chassisSeries: `${vehicle.chassisNumber}$` }))
      .rejects.toThrowError(ValidationError);
  });

  it("vehicle must have a valid chassisNumber", async () => {
    await expect(vehicleService.create({ ...vehicle, chassisNumber: undefined }))
      .rejects.toThrowError(ValidationError);

    await expect(vehicleService.create({ ...vehicle, chassisNumber: 0.1 }))
      .rejects.toThrowError(ValidationError);

    await expect(vehicleService.create({ ...vehicle, chassisNumber: -1 }))
      .rejects.toThrowError(ValidationError);
  });

  it("vehicle must have a valid type", async () => {
    await expect(vehicleService.create({ ...vehicle, type: undefined }))
      .rejects.toThrowError(ValidationError);
  });
});

describe("Vehicle update", () => {
  it("only color can be updated", async () => {
    const { _id } = await vehicleService.create({ ...vehicle, type: VehicleType.BUS });

    const chassisNumber = vehicle.chassisNumber ?? 0 - 1;

    await expect(vehicleService.update(_id, { chassisNumber }))
      .rejects.toThrowError(ValidationError);

    const chassisSeries = `${vehicle.chassisSeries}${vehicle.chassisSeries}`;

    await expect(vehicleService.update(_id, { chassisSeries }))
      .rejects.toThrowError(ValidationError);

    const type = VehicleType.CAR;

    await expect(vehicleService.update(_id, { type }))
      .rejects.toThrowError(ValidationError);

    const numberOfPassengers = vehicle.numberOfPassengers ?? 0 + 1;

    await expect(vehicleService.update(_id, { numberOfPassengers }))
      .rejects.toThrowError(ValidationError);

    const color = `${vehicle.color}${faker.random.alphaNumeric()}`;

    vehicle = await vehicleService.update(_id, { color });

    expect(vehicle.color).toBe(color);
  });
});

function createValidVehicle(): AbstractVehicle {
  return {
    chassisSeries: faker.random.uuid(),
    chassisNumber: faker.random.number(),
    type: VehicleType.BUS,
    numberOfPassengers: faker.random.number(),
  };
}
