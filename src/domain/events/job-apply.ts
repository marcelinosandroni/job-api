import { JobApply } from "domain/entities/job-apply.entity";
import { DomainEvent } from "./domain-event";

export class JobApplyDomainEvent extends DomainEvent {
  constructor(public readonly jobApply: JobApply) {
    super("JobApply");
  }
}
