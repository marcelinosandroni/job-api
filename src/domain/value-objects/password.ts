import { ValueObject } from "domain/primitives/value-object";
import { hash, compare } from "bcrypt";

interface PasswordProperties {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<string> {
  static readonly minLength = 6;
  static readonly maxLength = 20;
  private readonly salt = 12;

  constructor(value: string, private hashed: boolean) {
    super(value);
  }

  static create(input: PasswordProperties): Password {
    return new Password(input.value, input.hashed || false);
  }

  isHashed(): boolean {
    return this.hashed;
  }

  async comparePassword(password: string): Promise<boolean> {
    if (this.hashed) {
      return compare(password, this.value);
    }

    return this.value === password;
  }

  async hashedPassword(): Promise<Password> {
    if (this.hashed) {
      return this;
    }
    const hashedPassword = await this.hashPassword();
    return new Password(hashedPassword, true);
  }

  private async hashPassword(): Promise<string> {
    return hash(this.value, this.salt);
  }
}
