import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import {
  loginController,
  logoutController,
  meController,
  refreshTokenController,
  registerController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateSchema(registerSchema), registerController);

router.post("/login", validateSchema(loginSchema), loginController);

router.post("/logout", logoutController);

router.get("/refresh-token", refreshTokenController);

router.get("/me", authMiddleware, meController);

export default router;
