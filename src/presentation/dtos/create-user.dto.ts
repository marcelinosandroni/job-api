import { createUserSchema } from "presentation/validators/create-user.schema";
import { z } from "zod";

export type CreateUserDto = z.infer<typeof createUserSchema>;
