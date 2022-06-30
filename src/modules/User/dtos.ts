import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  type: z.string(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
