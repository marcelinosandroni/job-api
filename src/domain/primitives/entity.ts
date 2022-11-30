import { UniqueIdentifier } from "domain/value-objects/unique-identifier";

export interface BaseEntityInput {
  id?: UniqueIdentifier;
}

export type BaseEntityProperties = Required<BaseEntityInput>;

export abstract class Entity<Properties> {
  protected properties: BaseEntityProperties & Properties;
  protected isNew = false;

  constructor(properties: BaseEntityInput & Properties) {
    if (!properties.id) {
      this.isNew = true;
      properties.id = UniqueIdentifier.generate();
    }
    this.properties = properties as BaseEntityProperties & Properties;
  }

  get id(): UniqueIdentifier {
    return this.properties.id;
  }

  equals(entity: Entity<Properties>): boolean {
    if (!entity.properties.id) {
      return false;
    }
    return this.properties.id === entity.properties.id;
  }

  toObject(): Properties {
    return this.properties;
  }

  toJson(): string {
    return JSON.stringify(this.properties, null, 2);
  }

  toString(): string {
    return `[${this.constructor.name} Entity]`;
  }

  valueof(): Properties {
    return this.properties;
  }
}
