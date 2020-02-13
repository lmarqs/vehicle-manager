import HttpStatus from "http-status-codes";
import request from "supertest";

import { app } from "./server";

describe("vehicle endpoints", () => {
  it("should create a new vehicle", async () => {
    app.use((req, res, next) => {
      next(new Error());
    });

    const res = await request(app)
      .post("500")
      .send();

    expect(res.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});

