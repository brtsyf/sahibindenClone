import { Router } from "express";
import {
  createAdvertController,
  deleteAdvertController,
  detailAdvertController,
  listAdvertController,
  updateAdvertController,
} from "../controllers/advert.controller";
import { validateSchema } from "../middlewares/validateSchema";
import {
  createAdvertSchema,
  updateAdvertSchema,
} from "../schema/advert.schema";
import { advertPermissionMiddleware } from "../middlewares/advertPermission.middleware";

const router = Router();

/**
 * @swagger
 * /api/adverts/create:
 *   post:
 *     tags:
 *       - Adverts
 *     summary: Create a new advert
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Advert created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/create",
  validateSchema(createAdvertSchema),
  createAdvertController
);

/**
 * @swagger
 * /api/adverts:
 *   get:
 *     tags:
 *       - Adverts
 *     summary: List all adverts
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: List of adverts
 */
router.get("/", listAdvertController);

/**
 * @swagger
 * /api/adverts/{id}:
 *   get:
 *     tags:
 *       - Adverts
 *     summary: Get advert details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Advert ID
 *     responses:
 *       200:
 *         description: Advert details
 *       404:
 *         description: Advert not found
 */
router.get("/:id", detailAdvertController);

/**
 * @swagger
 * /api/adverts/{id}/update:
 *   put:
 *     tags:
 *       - Adverts
 *     summary: Update an advert
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Advert ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Advert updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the owner of the advert
 *       404:
 *         description: Advert not found
 */
router.put(
  "/:id/update",
  advertPermissionMiddleware,
  validateSchema(updateAdvertSchema),
  updateAdvertController
);

/**
 * @swagger
 * /api/adverts/{id}/delete:
 *   delete:
 *     tags:
 *       - Adverts
 *     summary: Delete an advert
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Advert ID
 *     responses:
 *       200:
 *         description: Advert deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the owner of the advert
 *       404:
 *         description: Advert not found
 */
router.delete(
  "/:id/delete",
  advertPermissionMiddleware,
  deleteAdvertController
);

export default router;
