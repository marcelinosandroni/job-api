import { randomUUID } from "crypto";
import { ValueObject } from "domain/primitives/value-object";

export class UniqueIdentifier extends ValueObject<string> {
  constructor(value: string) {
    super(value ?? UniqueIdentifier.generate());
  }

  static generate(): UniqueIdentifier {
    return new UniqueIdentifier(randomUUID());
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
