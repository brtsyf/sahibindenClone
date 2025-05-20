import { User } from "../../generated/prisma";

export const withoutPassword = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  };
};
