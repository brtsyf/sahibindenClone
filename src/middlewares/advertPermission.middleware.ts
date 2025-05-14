import { NextFunction, Request, Response } from "express";
import { checkAuthor } from "../models/advert.model";

export const advertPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  const user = (req as any).user;

  const advertAuthor = await checkAuthor(id);

  if (advertAuthor?.authorEmail !== user.email) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this advert" });
  }

  next();
};
