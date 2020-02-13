import { Model } from "@vehicle-manager/api";
import { Router } from "express";
import HttpStatus from "http-status-codes";

import { BaseCrudService } from "../services";

export function RestRouter<T extends Model>(service: BaseCrudService<T>) {

  const router = Router();

  router
    .route("/:id")
    .get(async (req, res, next) => {
      try {
        const model = await service.delete(req.params.id);
        res.status(HttpStatus.OK).send(model);
      } catch (e) {
        next(e);
      }
    })
    .put(async (req, res, next) => {
      try {
        const model = await service.update(req.params.id, req.body);
        res.status(HttpStatus.OK).send(model);
      } catch (e) {
        next(e);
      }
    })
    .delete(async (req, res, next) => {
      try {
        const model = await service.delete(req.params.id);
        res.status(HttpStatus.OK).send(model);
      } catch (e) {
        next(e);
      }
    });

  router
    .route("/")
    .post(async (req, res, next) => {
      try {
        const model = await service.create(req.body);
        res.status(HttpStatus.CREATED).send(model);
      } catch (e) {
        next(e);
      }
    })
    .get(async (req, res, next) => {
      const models = await service.find(req.query);
      res.status(HttpStatus.OK).send(models);
    });

  return router;
}
