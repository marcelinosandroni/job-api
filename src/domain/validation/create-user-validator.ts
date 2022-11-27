import { Validation } from "./validation";
import { z } from "zod";

export class CreateUserValidator implements Validation {
  constructor() {}

  validate(input: unknown): Error | void {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(18),
    });
    const isValid = createUserSchema.parse(input);
    if (!isValid) {
      return new Error("Invalid properties creating new user");
    }
  }
}
