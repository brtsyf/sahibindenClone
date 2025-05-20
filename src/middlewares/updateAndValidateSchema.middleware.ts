import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const updateAndValidateSchema = (schema: z.ZodSchema): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = {
      ...req.body,
      image: req.file?.path,
    };
    const { error } = schema.safeParse(body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};
