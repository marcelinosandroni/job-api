import { Result } from "domain/errors/result";

export interface Validation<Output = unknown> {
  validate(value: unknown): Result<Output>;
}
