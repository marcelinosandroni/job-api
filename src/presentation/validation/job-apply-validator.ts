import { Result } from "domain/errors/result";
import { Validation } from "./validation";
import { z } from "zod";

interface Schema<Type = unknown> {
  parse(value: Type): Result;
}

export class JobApplyValidator implements Validation {
  constructor(private readonly jobApplySchema: Schema) {}

  validate(value: unknown): Result<unknown> {
    return Result.from(value).bind(this.jobApplySchema.parse);
  }
}
