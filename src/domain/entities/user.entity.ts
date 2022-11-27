import { UserValidator } from "domain/validation/user-validator";
import { BaseEntityProperties, Entity } from "./base.entity";
import { Job } from "./job.entity";

export interface UserProperties extends BaseEntityProperties {
  name: string;
  email: string;
  hasConfirmedEmail?: boolean;
  password: string;
  biography: string;
  currentJob?: Job;
  jobApplies?: string[];
  createDate?: Date;
  lastChangeDate?: Date;
}

export class User extends Entity<UserProperties> {
  constructor(properties: UserProperties) {
    super(properties);
    User.validate(properties);
  }

  static validate(properties: UserProperties): void {
    const validator = new UserValidator();
    const error = validator.validate(properties);
    if (error) {
      throw new Error(error.message);
    }
  }

  update(name: string, email: string, biography: string): this {
    this.changeName(name);
    this.changeEmail(email);
    this.changeBiography(biography);
    return this;
  }

  changePassword(password: string): this {
    User.validate({ ...this.properties, password });
    this.properties.password = password;
    return this;
  }

  get hasConfirmedEmail(): boolean {
    return !!this.properties.hasConfirmedEmail;
  }

  get email(): string {
    return this.properties.email;
  }

  get password(): string {
    return this.properties.password;
  }

  get name(): string {
    return this.properties.name;
  }

  getAllJobAppliesCompanies(): string[] {
    return this.jobApplies.map((jobApply) => jobApply.company);
  }

  changeName(name: string): this {
    this._name = name;
    return this;
  }

  changeEmail(email: string): this {
    this._email = email;
    this._hasConfirmedEmail = false;
    return this;
  }

  changeBiography(description: string): this {
    this.biography = description;
    return this;
  }

  confirmEmail(): this {
    this._hasConfirmedEmail = true;
    return this;
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
    return JSON.stringify(this.toObject());
  }
}
