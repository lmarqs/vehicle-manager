import express from "express";

import * as middlewares from "./middlewares";
import { router } from "./router";

export function createApp() {
  const app = express();

  app.use(middlewares.logger);
  app.use(middlewares.securityChecking);

  app.use(router);
  app.use(middlewares.errorHandler);

  return app;
}
