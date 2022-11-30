export abstract class ValueObject<Type = unknown> {
  constructor(public readonly value: Type) {
    Object.freeze(this.value);
  }

  equals(valueObject: ValueObject<Type>): boolean {
    if (typeof this.value === "object") {
      return JSON.stringify(this.value) === JSON.stringify(valueObject.value);
    }
    return this.value === valueObject.value;
  }
}
