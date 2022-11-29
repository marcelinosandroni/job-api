import { Validation } from "./validation";
import { z } from "zod";
import { Result } from "domain/errors/result";
import { ZodValidationIssueMessage } from "./zod-issue-message";

export class UserValidator implements Validation {
  validate(value: unknown): Result {
    const userSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(18),
      createdDate: z.date().nullish(),
      lastChageDate: z.date().nullish(),
    });
    const result = userSchema.safeParse(value);
    if (!result.success) {
      const formattedErrors = new ZodValidationIssueMessage(
        result.error.issues,
        "Invalid user properties"
      );
      return Result.failure(formattedErrors);
    }
    return Result.success(result.data);
  }
}
