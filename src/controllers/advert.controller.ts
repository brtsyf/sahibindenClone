import { Request, Response } from "express";
import {
  checkAuthor,
  createAdvert,
  deleteAdvert,
  getAdvertById,
  getAdverts,
  updateAdvert,
} from "../models/advert.model";

export const createAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description, price } = req.body;

  const advert = await createAdvert({
    authorEmail: (req as any).user.email,
    name,
    description,
    price,
  });

  return res.status(201).json({ message: "Create advert successful", advert });
};

export const detailAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing advert ID in request" });
  }

  const advert = await getAdvertById(id);

  if (!advert) {
    return res.status(404).json({ message: "Advert not found" });
  }

  return res.status(200).json({ message: "Advert detail", advert });
};

export const listAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const adverts = await getAdverts((req as any).user.email);

  return res.status(200).json({ message: "List adverts", adverts });
};

export const deleteAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const advert = await deleteAdvert(id);
    return res.status(200).json({ message: "Advert deleted", advert });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this advert" });
  }
};

export const updateAdvertController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const advert = await updateAdvert(id, { name, description, price });

  return res.status(200).json({ message: "Advert updated", advert });
};
