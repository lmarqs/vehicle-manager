import { Router } from "express";
import { vehicleService } from "../../services";
import { RestRouter } from "../rest-router";
import { queryParser } from "./query-parser";

export const router = Router();
router.use(queryParser);
router.use(RestRouter(vehicleService));
