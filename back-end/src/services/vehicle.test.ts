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

  it("chassisId is unique", async () => {
    await vehicleService.create(vehicle);
    await expect(vehicleService.create(vehicle)).rejects.toThrowError();
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
});

function createValidVehicle(): AbstractVehicle {
  return {
    chassisSeries: faker.random.uuid(),
    chassisNumber: faker.random.number(),
  };
}
