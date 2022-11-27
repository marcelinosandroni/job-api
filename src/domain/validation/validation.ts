export interface Validation {
  validate(valud: unknown): void | Error;
}
