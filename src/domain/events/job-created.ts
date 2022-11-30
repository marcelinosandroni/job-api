import { Job } from "domain/entities/job.entity";
import { DomainEvent } from "domain/primitives/domain-event";

export class JobCreatedDomainEvent extends DomainEvent {
  constructor(public readonly job: Job) {
    super("JobCreated");
  }
}
