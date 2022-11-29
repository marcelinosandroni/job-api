import { BaseEntityProperties, Entity } from "domain/entities/base.entity";
import { DomainEvent } from "domain/events/domain-event";
import { EventEmitter } from "events";

export abstract class AggregateRoot<
  Type extends BaseEntityProperties
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
