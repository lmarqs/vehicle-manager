import { Router } from "express";

import bodyParser from "body-parser";

import { router as vehiclesRouter } from "./vehicles";

export const router = Router();

router
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

router.use("/vehicles", vehiclesRouter);
