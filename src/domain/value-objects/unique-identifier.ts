import { ValueObject } from "./value-object";
import { randomUUID } from "crypto";

export class UniqueIdentifier extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static generate(): string {
    return randomUUID();
  }

  protected validate(): void {
    if (!this.value) {
      throw new Error("Invalid unique identifier");
    }
  }
}
