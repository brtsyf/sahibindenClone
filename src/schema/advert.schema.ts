import { string, z } from "zod";

export const createAdvertSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(0),
  categoryId: z.string().default("1"),
});

const imageType = z.object({
  url: z.string().min(1),
});

export const updateAdvertSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    image: z.array(imageType),
  })
  .refine(
    (data) => {
      // Check if at least one field is provided
      return Object.keys(data).length > 0;
    },
    {
      message: "At least one field must be provided for update",
    }
  );
