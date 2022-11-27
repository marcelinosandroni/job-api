import { Company } from "domain/entities/company.entity";
import { BaseEntityProperties, Entity } from "./base.entity";

interface JobProperties extends BaseEntityProperties {
  company: Company;
  role: string;
  startDate: Date;
  endDate?: Date;
}

export class Job extends Entity<JobProperties> {
  constructor(properties: JobProperties) {
    super(properties);
    const now = new Date();
  }

  static validator(properties: JobProperties): void {
    const validator = new JobValidator();
    const error = validator.validate(properties);
    if (error) {
      throw new Error(error.message);
    }
  }

  update(
    company: Company,
    role: string,
    startDate: Date,
    endDate?: Date
  ): this {
    this.changeCompany(company);
    this.changeRole(role);
    this.changeStartDate(startDate);
    this.changeEndDate(endDate);
    return this;
  }

  get company(): Company {
    return this.properties.company;
  }

  changeCompany(company: Company): this {
    this.properties.company = company;
    return this;
  }

  get role(): string {
    return this.properties.role;
  }

  changeRole(role: string): this {
    if (role.length < 3) {
      throw new Error("Role must be at least 3 characters long");
    }
    if (role.length > 50) {
      throw new Error("Role must be less than 50 characters long");
    }
    this.properties.role = role;
    return this;
  }

  get startDate(): Date {
    return this.properties.startDate;
  }

  changeStartDate(startDate: Date): this {
    const now = new Date();
    if (startDate > now) {
      throw new Error("Start date cannot be in the future");
    }
    this.properties.startDate = startDate;
    return this;
  }

  get endDate(): Date | undefined {
    return this.properties.endDate;
  }

  changeEndDate(endDate: Date): this {
    if (!this.startDate) {
      throw new Error("Start date is required to set a End date");
    }
    if (endDate < this.startDate) {
      throw new Error("End date cannot be less than start date");
    }
    this.properties.endDate = endDate;
    return this;
  }
}
