import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/hooks/bycrpt";
import { createUser, findExitUser, getUserById } from "../models/auth.model";
import { generateToken, verifyToken } from "../utils/hooks/jsonwebtoken";

export const registerController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, email, password } = req.body;

  const user = await findExitUser(email);

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await createUser(name, email, hashedPassword);

  const accessToken = generateToken({ sub: newUser.id }, "1h");
  const refreshToken = generateToken({ sub: newUser.id }, "7d");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json({ message: "User created successfully", user: newUser });
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  const user = await findExitUser(email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const accessToken = generateToken({ sub: user.id }, "1h");
  const refreshToken = generateToken({ sub: user.id }, "7d");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ message: "Login successful", user });
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<any> => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logout successful" });
};

export const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = verifyToken(refreshToken);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await getUserById(parseInt(decoded.sub as string));

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = generateToken({ sub: user.id }, "1h");
  const newRefreshToken = generateToken({ sub: user.id }, "7d");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ message: "Refresh token successful" });
};

export const meController = async (
  req: Request,
  res: Response
): Promise<any> => {
  return res
    .status(200)
    .json({ message: "Me successful", user: (req as any).user });
};
