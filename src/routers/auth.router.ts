import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../schema/auth.schema";
import {
  loginController,
  logoutController,
  meController,
  refreshTokenController,
  registerController,
  updateController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userParser } from "../utils/hooks/cloudinary";
import { updateAndValidateSchema } from "../middlewares/updateAndValidateSchema.middleware";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/register", validateSchema(registerSchema), registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateSchema(loginSchema), loginController);

/**
 * @swagger
 * /api/auth/update:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input data
 */
router.post(
  "/update",
  authMiddleware,
  userParser.single("image"),
  updateAndValidateSchema(updateUserSchema),
  updateController
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", logoutController);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Refresh access token
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Invalid refresh token
 */
router.get("/refresh-token", refreshTokenController);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authMiddleware, meController);

export default router;
