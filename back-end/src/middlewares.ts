import { ErrorRequestHandler } from "express";
import helmet from "helmet";
import HttpStatus from "http-status-codes";
import morgan from "morgan";

import { EntityNotFoundError, ValidationError } from "./services";

export const logger = morgan("combined");

export const securityChecking = helmet();

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  const status =
    err instanceof ValidationError ? HttpStatus.BAD_REQUEST
      : err instanceof EntityNotFoundError ? HttpStatus.NOT_FOUND
        : err.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

  res.status(status)
    .send({
      status,
      error: HttpStatus.getStatusText(status),
      data: err.payload,
    });
};
