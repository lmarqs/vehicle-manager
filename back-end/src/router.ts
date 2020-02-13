import { Router } from "express";

import { router as apiRouter } from "./api";

export const router = Router();

router.use("/api", apiRouter);
