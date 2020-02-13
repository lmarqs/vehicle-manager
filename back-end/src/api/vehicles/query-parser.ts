import { RequestHandler } from "express";

export const queryParser: RequestHandler = (req, res, next) => {
  if (req.query.chassisNumber) {
    req.query.chassisNumber = parseInt(req.query.chassisNumber, 10);
  }
  next();
};
