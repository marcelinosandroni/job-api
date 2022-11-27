import { z } from "zod";
import { Validation } from "./validation";

export class CompanyValidator implements Validation {
  validate(input: unknown): Error | void {
    const companySchema = z.object({
      sector: z.string(),
      employeesAmount: z.number().min(0).max(100000).optional(),
      website: z.string().url().optional().optional(),
    });
    const isValid = companySchema.parse(input);
    if (!isValid) {
      return new Error("Invalid properties instantiating company");
    }
  }
}
