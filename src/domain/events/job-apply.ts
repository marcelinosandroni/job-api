import { JobApply } from "domain/entities/job-apply.entity";
import { DomainEvent } from "domain/primitives/domain-event";

export class JobApplyCreatedDomainEvent extends DomainEvent {
  constructor(public readonly jobApply: JobApply) {
    super("JobApplyCreated");
  }
}
