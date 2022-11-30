import { Result } from "domain/abstractions/result";
import { DomainError } from "domain/errors/domain-error";
import { JobApplyCreatedDomainEvent } from "domain/events/job-apply";
import { RequiredAllBut } from "domain/interfaces/require-all-but";
import { AggregateRoot } from "domain/primitives/agregate-root";
import { BaseEntityInput } from "domain/primitives/entity";
import { Company } from "./company";

/**
 * Input to create a new entity
 */
export interface JobApplyInput extends BaseEntityInput {
  company: Company;
  type: string;
  role: string;
  description: string;
  requirements: string[];
  date?: Date;
  appliesAmount?: number;
}

/**
 * Entity properties after creation [Output]
 */
export type JobApplyProperties = RequiredAllBut<JobApplyInput, "id">;

export class JobApply extends AggregateRoot<JobApplyProperties> {
  // generate getters for all properties
  get company(): Company {
    return this.properties.company;
  }

  get type(): string {
    return this.properties.type;
  }

  get role(): string {
    return this.properties.role;
  }

  get description(): string {
    return this.properties.description;
  }

  get requirements(): string[] {
    return this.properties.requirements;
  }

  get date(): Date {
    return this.properties.date;
  }

  get appliesAmount(): number {
    return this.properties.appliesAmount;
  }

  constructor(properties: JobApplyProperties) {
    super(properties);
  }

  static create(properties: JobApplyInput): Result<JobApply> {
    if (properties.appliesAmount && properties.appliesAmount < 0) {
      return Result.failure<JobApply>(
        DomainError.jobApply.negativeAppliesAmount
      );
    }
    const validedProperties = {
      ...properties,
      description: properties.description ?? "",
      requirements: properties.requirements ?? [],
      date: properties.date ?? new Date(),
      appliesAmount: properties.appliesAmount ?? 0,
    };
    const jobApply = new JobApply(validedProperties);
    if (jobApply.isNew) {
      jobApply.addDomainEvent(new JobApplyCreatedDomainEvent(jobApply));
    }
    return Result.success(jobApply);
  }
}
