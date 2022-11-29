import { UserCreatedDomainEvent } from "domain/events/user-created";
import { AggregateRoot } from "domain/primitives/agregate-root";
import { BaseEntityProperties } from "domain/primitives/entity";
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

export class User extends AggregateRoot<UserProperties> {
  get name(): string {
    return this.properties.name;
  }

  get email(): string {
    return this.properties.email;
  }

  get hasConfirmedEmail(): boolean {
    return !!this.properties.hasConfirmedEmail;
  }

  get password(): string {
    return this.properties.password;
  }

  get biography(): string {
    return this.properties.biography;
  }

  get currentJob(): Job | void {
    return this.properties.currentJob;
  }

  get jobApplies(): string[] {
    return this.properties.jobApplies!;
  }

  get createDate(): Date {
    return this.properties.createDate!;
  }

  get lastChangeDate(): Date {
    return this.properties.lastChangeDate!;
  }

  getAllJobAppliesCompanies(): string[] {
    return this.jobApplies.map((jobApply) => jobApply.company);
  }

  hasJob(): boolean {
    return !!this.currentJob;
  }

  private constructor(properties: UserProperties) {
    super(properties);
    User.validate(properties);
  }

  static create(properties: UserProperties): User {
    User.validate(properties);
    const user = new User(properties);
    const isNewUser = !properties.id;
    if (isNewUser) {
      user.addDomainEvent(new UserCreatedDomainEvent(user));
    }
    return user;
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
