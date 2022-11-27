import { ValueObject } from "./value-object";

export class Name extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(): void {
    if (!this.value) {
      throw new Error("Invalid name");
    }
    if (this.value.length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }
    if (this.value.length > 50) {
      throw new Error("Name must be less than 50 characters long");
    }
  }
}
