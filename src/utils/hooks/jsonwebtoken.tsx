import jwt from "jsonwebtoken";

export const generateToken = (payload: any, time: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: time as unknown as number,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
