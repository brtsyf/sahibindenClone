import { Request } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const AdvertStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: async (req: Request, file: Express.Multer.File) => {
      return `adverts/${new Date().getTime()}/${file.originalname}`;
    },
  },
});

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: async (req: Request, file: Express.Multer.File) => {
      return `users/${new Date().getTime()}/${(req as any).user.id}/${
        file.originalname
      }`;
    },
  },
});

export const parser = multer({
  storage: AdvertStorage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

export const userParser = multer({
  storage: userStorage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});
