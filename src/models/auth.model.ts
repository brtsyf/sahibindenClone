import { prisma } from "../../prisma/client";

export const findExitUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    },
  });
  return user;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const updateUser = async (id: number, name: string, image: string) => {
  const user = await prisma.user.update({
    where: { id },
    data: { name, image },
  });
  return user;
};
