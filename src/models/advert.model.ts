import { compare } from "bcrypt";
import { prisma } from "../../prisma/client";

export const createAdvert = async ({
  authorEmail,
  name,
  description,
  price,
  categoryId,
}: {
  authorEmail: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}) => {
  const advert = await prisma.advert.create({
    data: {
      authorEmail,
      name,
      description,
      price,
      categoryId,
    },
  });
  return advert;
};

export const getAdvertById = async (id: string) => {
  const advert = await prisma.advert.findUnique({
    where: { id },
  });
  return advert;
};

export const getAdverts = async (authorEmail: string) => {
  const adverts = await prisma.advert.findMany({
    where: {
      authorEmail: {
        equals: authorEmail,
      },
    },
  });
  return adverts;
};

export const deleteAdvert = async (id: string) => {
  const advert = await prisma.advert.delete({
    where: { id },
  });
  return advert;
};

export const checkAuthor = async (id: string) => {
  const advert = await prisma.advert.findUnique({
    where: { id: id },
  });
  return advert;
};

export const updateAdvert = async (
  id: string,
  {
    name,
    description,
    price,
  }: { name: string; description: string; price: number }
) => {
  const advert = await prisma.advert.update({
    where: { id },
    data: { name, description, price },
  });
  return advert;
};
