import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.ts";
import { loginSchema, registerSchema } from "../schema/auth.schema.ts";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/register", validateSchema(registerSchema), registerController);

router.post("/login", validateSchema(loginSchema), loginController);

router.post("/logout", logoutController);

router.get("/refresh-token", refreshTokenController);

export default router;
