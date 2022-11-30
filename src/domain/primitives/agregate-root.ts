import { EventEmitter } from "events";
import { DomainEvent } from "./domain-event";
import { BaseEntityInput, Entity } from "./entity";

export abstract class AggregateRoot<
  Type extends BaseEntityInput
> extends Entity<Type> {
  protected readonly domainEvents = new EventEmitter();

  constructor(properties: Type) {
    super(properties);
  }

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.emit(event.name, event);
    this.logDomainEvent(event);
  }

  protected logDomainEvent(event: DomainEvent): void {
    console.log(
      `[Domain Event Created]: ${this.constructor.name} => ${event.name}`
    );
  }
}
