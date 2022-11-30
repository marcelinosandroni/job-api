import { Name } from "domain/value-objects/name.value-object";
import { BaseEntityProperties, Entity } from "../primitives/entity";

export interface CompanyProperties extends BaseEntityProperties {
  name: Name;
  sector: string;
  employeesAmount?: number;
  website?: string;
  active?: boolean;
}

export class Company extends Entity<CompanyProperties> {
  private constructor(properties: CompanyProperties) {
    super(properties);
  }

  static create(properties: CompanyProperties): Company {
    if (!properties.employeesAmount) {
      this.properties.employeesAmount = 0;
    }
    if (typeof properties.active !== "boolean") {
      this.properties.active = true;
    }
  }

  get active(): boolean {
    return !!this.properties.active;
  }

  activate(): this {
    this.properties.active = true;
    return this;
  }

  desactivate(): this {
    this.properties.active = false;
    return this;
  }

  get name(): Name {
    return this.properties.name;
  }

  changeName(name: Name): this {
    this.properties.name = name;
    return this;
  }

  get sector(): string {
    return this.properties.sector;
  }

  changeSector(sector: string): this {
    Company.validator({ ...this.properties, sector });
    this.properties.sector = sector;
    return this;
  }

  get employeesAmount(): number {
    return this.properties.employeesAmount || 0;
  }

  changeEmployeesAmount(employeesAmount: number): this {
    Company.validator({ ...this.properties, employeesAmount });
    this.properties.employeesAmount = employeesAmount;
    return this;
  }

  get website(): string {
    return this.properties.website || "";
  }

  changeWebsite(website: string): this {
    Company.validator({ ...this.properties, website });
    this.properties.website = website;
    return this;
  }
}
