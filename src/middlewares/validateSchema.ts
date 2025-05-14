import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateSchema = (schema: z.ZodSchema<any>): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = await schema.parseAsync(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};
