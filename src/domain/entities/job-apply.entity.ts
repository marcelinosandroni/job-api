import { AggregateRoot } from "domain/aggregates/agregate-root";
import { Result } from "domain/errors/result";
import { JobApplyDomainEvent } from "domain/events/job-apply";
import { JobApplyValidator } from "domain/validation/job-apply-validator";
import { BaseEntityProperties } from "./base.entity";
import { Company } from "./company.entity";

export interface JobApplyProperties extends BaseEntityProperties {
  company: Company;
  type: string;
  role: string;
  description: string;
  requirements: string[];
  date?: Date;
  appliesAmount?: number;
}
export class JobApply extends AggregateRoot<JobApplyProperties> {
  constructor(properties: JobApplyProperties) {
    super(properties);
  }

  static create(properties: JobApplyProperties): Result<JobApply> {
    const validedProperties = {
      ...properties,
      description: properties.description ?? "",
      requirements: properties.requirements ?? [],
      date: properties.date ?? new Date(),
      appliesAmount: properties.appliesAmount ?? 0,
    };
    if (!validedProperties) {
      return Result.failure<JobApply>("Invalid properties");
    }
    const isNewUser = !validedProperties.id;
    const jobApply = new JobApply({ ...validedProperties });
    if (isNewUser) {
      jobApply.addDomainEvent(new JobApplyDomainEvent(jobApply));
    }

    return Result.success(jobApply);
  }
}
