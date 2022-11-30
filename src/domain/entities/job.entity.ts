import { Result } from "domain/abstractions/result";
import { Company } from "domain/entities/company";
import { DomainError } from "domain/errors/domain-error";
import { JobCreatedDomainEvent } from "domain/events/job-created";
import { Maybe } from "domain/interfaces/maybe";
import { AggregateRoot } from "domain/primitives/agregate-root";
import { BaseEntityProperties } from "domain/primitives/entity";

interface JobProperties extends BaseEntityProperties {
  company: Company;
  role: string;
  startDate: Date;
  endDate?: Date;
}

export class Job extends AggregateRoot<JobProperties> {
  private constructor(properties: JobProperties) {
    super(properties);
  }

  static create(input: JobProperties): Result<Job> {
    if (input.endDate && input.startDate > input.endDate) {
      return Result.failure();
    }
    const job = new Job(input);
    if (job.isNew) {
      job.addDomainEvent(new JobCreatedDomainEvent(job));
    }
    return Result.success(job);
  }

  update(
    company: Company,
    role: string,
    startDate: Date,
    endDate?: Date
  ): Result<this> {
    return this.changeCompany(company)
      .flat(() => this.changeRole(role))
      .flat(() => this.changeStartDate(startDate))
      .flat((value) =>
        endDate ? this.changeEndDate(endDate) : Result.from(value)
      );
  }

  get company(): Company {
    return this.properties.company;
  }

  get role(): string {
    return this.properties.role;
  }

  get startDate(): Date {
    return this.properties.startDate;
  }

  get endDate(): Maybe<Date> {
    return this.properties.endDate;
  }

  changeCompany(company: Company): Result<this> {
    if (this.company.equals(company)) {
      return Result.failure(DomainError.job.changeToSameCompany);
    }
    this.properties.company = company;
    return Result.success(this);
  }

  changeRole(role: string): Result<this> {
    if (this.role === role) {
      return Result.failure(DomainError.job.changeToSameRole);
    }
    if (role.length < 3) {
      return Result.failure(DomainError.job.roleTooShort);
    }
    if (role.length > 50) {
      return Result.failure(DomainError.job.roleTooLong);
    }
    this.properties.role = role;
    return Result.success(this);
  }

  changeStartDate(startDate: Date): Result<this> {
    const now = new Date();
    if (startDate > now) {
      return Result.failure(DomainError.job.startDateInFuture);
    }
    this.properties.startDate = startDate;
    return Result.success(this);
  }

  changeEndDate(endDate: Date): Result<this> {
    if (!this.startDate) {
      return Result.failure(DomainError.job.startDateNotSet);
    }
    if (endDate < this.startDate) {
      return Result.failure(DomainError.job.endDateBeforeStartDate);
    }
    this.properties.endDate = endDate;
    return Result.success(this);
  }
}
