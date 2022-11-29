import { User } from "domain/entities/user.entity";
import { DomainEvent } from "./domain-event";

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(public readonly user: User) {
    super("UserCreated");
  }
}
