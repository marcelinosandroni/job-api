import { ValueObject } from "./value-object";
import { randomUUID } from "crypto";

export class UniqueIdentifier extends ValueObject<string> {
  constructor(value: string) {
    super(value ?? UniqueIdentifier.generate());
  }

  static generate(): string {
    return randomUUID();
  }

  protected validate(): void {
    if (!UniqueIdentifier.isValid(this.value)) {
      throw new Error("Invalid unique identifier");
    }
  }

  static isValid(value: unknown): boolean {
    const isValidUniqueIdentifier =
      typeof value === "string" && value.length === 36;
    if (!isValidUniqueIdentifier) {
      return false;
    }
    return true;
  }
}
