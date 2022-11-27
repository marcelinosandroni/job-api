import { Validation } from "./validation";
import { z } from "zod";

export class UserValidator implements Validation {
  validate(value: unknown): void | Error {
    const userSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(18),
      createdDate: z.date().nullable().optional(),
      lastChageDate: z.date().nullable().optional(),
    });
    const isValid = userSchema.parse(value);
    if (!isValid) {
      return new Error("Invalid properties instantiating user");
    }
  }
}
