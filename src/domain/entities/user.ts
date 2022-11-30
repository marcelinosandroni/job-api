import { Result } from "domain/abstractions/result";
import { DomainError } from "domain/errors/domain-error";
import { UserCreatedDomainEvent } from "domain/events/user-created";
import { Maybe } from "domain/interfaces/maybe";
import { RequiredAllBut } from "domain/interfaces/require-all-but";
import { Token } from "domain/interfaces/token";
import { AggregateRoot } from "domain/primitives/agregate-root";
import { BaseEntityInput } from "domain/primitives/entity";
import { Password } from "domain/value-objects/password";
import { sign, verify } from "jsonwebtoken";
import { Company } from "./company";
import { JobApply } from "./job-apply.entity";
import { Job } from "./job.entity";

export interface UserInput extends BaseEntityInput {
  name: string;
  email: string;
  hasConfirmedEmail?: boolean;
  password: Password;
  biography: string;
  currentJob?: Job;
  jobApplies?: JobApply[];
  createDate?: Date;
  lastChangeDate?: Date;
}

export type UserProperties = RequiredAllBut<UserInput, "currentJob" | "id">;

export class User extends AggregateRoot<UserProperties> {
  static readonly tokenSecret = "secret";
  static readonly tokenExpirationTime = "1h";

  get name(): string {
    return this.properties.name;
  }

  get email(): string {
    return this.properties.email;
  }

  get hasConfirmedEmail(): boolean {
    return !!this.properties.hasConfirmedEmail;
  }

  get password(): Password {
    return this.properties.password;
  }

  get biography(): string {
    return this.properties.biography;
  }

  get currentJob(): Maybe<Job> {
    return this.properties.currentJob;
  }

  get jobApplies(): JobApply[] {
    return this.properties.jobApplies!;
  }

  get createDate(): Date {
    return this.properties.createDate!;
  }

  get lastChangeDate(): Date {
    return this.properties.lastChangeDate!;
  }

  getAllJobAppliesCompanies(): Company[] {
    return this.jobApplies.map((jobApply) => jobApply.company);
  }

  hasJob(): boolean {
    return !!this.currentJob;
  }

  private constructor(properties: UserProperties) {
    super(properties);
  }

  static create(properties: UserInput): Result<User> {
    if (properties.name.split(" ").length < 2) {
      return Result.failure(DomainError.user.nameTooShort);
    }
    const validedProperties = {
      ...properties,
      jobApplies: properties.jobApplies || [],
      createDate: properties.createDate || new Date(),
      lastChangeDate: properties.lastChangeDate || new Date(),
      hasConfirmedEmail: properties.hasConfirmedEmail ? true : false,
    };
    const user = new User(validedProperties);
    if (user.isNew) {
      user.addDomainEvent(new UserCreatedDomainEvent(user));
    }
    return Result.success(user);
  }

  update(name: string, email: string, biography: string): this {
    this.changeName(name);
    this.changeEmail(email);
    this.changeBiography(biography);
    return this;
  }

  changePassword(password: Password): Result<this> {
    if (this.password.equals(password)) {
      return Result.failure(DomainError.user.changeToSamePassword);
    }
    this.properties.password = password;
    return Result.success(this);
  }

  changeName(name: string): Result<this> {
    if (this.name === name) {
      return Result.failure(DomainError.user.changeToSameName);
    }
    if (this.name.split(" ").length < 2) {
      return Result.failure(DomainError.user.nameTooShort);
    }
    this.properties.name = name.trim();
    return Result.success(this);
  }

  changeEmail(email: string): Result<this> {
    if (this.email === email) {
      return Result.failure(DomainError.user.changeToSameEmail);
    }
    this.properties.email = email;
    return Result.success(this);
  }

  changeBiography(description: string): Result<this> {
    if (this.biography === description) {
      return Result.failure(DomainError.user.changeToSameBiography);
    }
    this.properties.biography = description;
    return Result.success(this);
  }

  confirmEmail(): Result<this> {
    if (this.hasConfirmedEmail) {
      return Result.failure(DomainError.user.emailAlreadyConfirmed);
    }
    this.properties.hasConfirmedEmail = true;
    return Result.success(this);
  }

  async authenticate(password: Password): Promise<Result<boolean>> {
    if (password.isHashed()) {
      return Result.failure(DomainError.user.passwordToCompareHashed);
    }
    const isMath = await this.password.comparePassword(password.value);
    return Result.from(isMath);
  }

  authorize(token: string): boolean {
    try {
      const decoded = verify(token, User.tokenSecret);
      if (typeof decoded === "string") {
        return false;
      }
      if (!decoded.exp || decoded.exp < Date.now()) {
        return false;
      }
      return decoded.id === this.id;
    } catch (error) {
      return false;
    }
  }

  generateToken(): Token {
    return sign({ id: this.id }, User.tokenSecret, {
      expiresIn: User.tokenExpirationTime,
    });
  }

  toObject(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createDate: this.createDate,
      lastChangeDate: this.lastChangeDate,
      biography: this.biography,
      hasConfirmedEmail: this.hasConfirmedEmail,
      currentJob: this.currentJob,
      jobApplies: this.jobApplies,
    };
  }

  toJSON(): string {
    return JSON.stringify(this.toObject(), null, 2);
  }
}
