import express from "express";

import * as middlewares from "./middlewares";
import { router } from "./router";

export function createApp(port: number = 3000) {
  const app = express();

  app.use(middlewares.logger);
  app.use(middlewares.securityChecking);

  app.use(router);
  app.use(middlewares.errorHandler);

  app.listen(port);

  return app;
}
