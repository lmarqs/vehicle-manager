import { Model } from "./model";

export const VEHICLE = "Vehicle";

export enum VehicleType {
  BUS = "BUS",
  TRUCK = "TRUCK",
  CAR = "CAR",
}

export interface AbstractVehicle extends Model {
  chassisNumber?: number;
  chassisSeries?: string;
  numberOfPassengers?: number;
  type?: VehicleType;
  color?: string;
}

export interface Bus extends AbstractVehicle {
  numberOfPassengers: 42;
  type: VehicleType.BUS;
}

export interface Truck extends AbstractVehicle {
  numberOfPassengers: 42;
  type: VehicleType.BUS;
}

export interface Car extends AbstractVehicle {
  numberOfPassengers: 4;
  type: VehicleType.CAR;
}

export type Vehicle =
  | Bus
  | Truck
  | Car
  ;
