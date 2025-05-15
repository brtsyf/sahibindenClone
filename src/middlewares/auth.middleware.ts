import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/hooks/jsonwebtoken";
import { getUserById } from "../models/auth.model";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyToken(accessToken);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await getUserById(parseInt(decoded.sub as string));

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const newUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  (req as any).user = newUser;

  next();
};
