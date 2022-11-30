import { Validation } from "./validation";
import { z } from "zod";
import { Result } from "domain/errors/result";
import { ZodValidationIssueMessage } from "./zod-issue-message";

export class CreateUserValidator implements Validation {
  validate(input: unknown): Result {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6).max(18),
    });
    const parseResult = createUserSchema.safeParse(input);
    if (!parseResult.success) {
      return Result.failure(
        new ZodValidationIssueMessage(
          parseResult.error.issues,
          "Invalid properties creating user"
        )
      );
    }
    return Result.success(parseResult.data);
  }
}
