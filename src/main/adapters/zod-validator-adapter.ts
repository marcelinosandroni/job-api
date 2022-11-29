import { ZodValidationIssueMessage } from "domain/validation/zod-issue-message";

export const adaptZodValidator = (schema: Zod.Schema, errorMessage: string) => {
  return (value: unknown) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      throw new ZodValidationIssueMessage(result.error.issues, errorMessage);
    }
    return result.data;
  };
};
