import { Model } from "@vehicle-manager/api";
import ValidateJS from "validate.js";

export type ModelConstraits<T extends Model> = Partial<Record<keyof T, any>>;

export function validate<T extends Model>(model: T, constraits: ModelConstraits<T>) {
  const errors = ValidateJS(model, constraits);
  if (errors) {
    throw new ValidationError(errors);
  }
}

export class ValidationError extends Error {
  public readonly payload: { errors: Record<string, string> };

  constructor(errors: any) {
    super("ValidationError");
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.payload = { errors };
  }
}
