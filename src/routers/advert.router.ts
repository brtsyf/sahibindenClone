import { Router } from "express";
import {
  createAdvertController,
  deleteAdvertController,
  detailAdvertController,
  listAdvertController,
  updateAdvertController,
} from "../controllers/advert.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { createAdvertSchema } from "../schema/advert.schema";
import { advertPermissionMiddleware } from "../middlewares/advertPermission.middleware";

const router = Router();

router.post(
  "/create",
  validateSchema(createAdvertSchema),
  createAdvertController
);

router.get("/", listAdvertController);

router.get("/:id", detailAdvertController);

router.put(
  "/:id/update",
  advertPermissionMiddleware,
  validateSchema(createAdvertSchema),
  updateAdvertController
);

router.delete(
  "/:id/delete",
  advertPermissionMiddleware,
  deleteAdvertController
);

export default router;
