import { User } from "domain/entities/user";
import { DomainEvent } from "domain/primitives/domain-event";

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(public readonly user: User) {
    super("UserCreated");
  }
}
