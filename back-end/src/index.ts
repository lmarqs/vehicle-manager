import { Express } from "express";
import { createApp } from "./app";

let app: Express | null = null;

if (!app) {
  const port = 3000;
  app = createApp();
  // tslint:disable-next-line: no-console
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

export { app };
