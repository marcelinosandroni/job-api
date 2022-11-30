import { ChangeToSameValue } from "./change-to-same-value";

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }

  static user = {
    nameTooShort: new DomainError("Name must have more than 1 word"),
    changeToSamePassword: new ChangeToSameValue("password"),
    changeToSameName: new ChangeToSameValue("name"),
    changeToSameEmail: new ChangeToSameValue("email"),
    changeToSameBiography: new ChangeToSameValue("biography"),
    emailAlreadyConfirmed: new DomainError("Email already confirmed"),
    passwordNotMatch: new DomainError("Password not match"),
    passwordToCompareHashed: new DomainError("Password to compare is hashed"),
  };

  static jobApply = {
    negativeAppliesAmount: new DomainError("Applies amount must be positive"),
  };

  static job = {
    changeToSameCompany: new ChangeToSameValue("company"),
    changeToSameRole: new ChangeToSameValue("role"),
    changeToSameStartDate: new ChangeToSameValue("startDate"),
    ChangeToSameEndDate: new ChangeToSameValue("endDate"),
    roleTooShort: new DomainError("Role must be at least 3 characters long"),
    roleTooLong: new DomainError("Role must be at most 50 characters long"),
    startDateInFuture: new DomainError("Start date must be in the past"),
    startDateNotSet: new DomainError("Start date must be set"),
    endDateBeforeStartDate: new DomainError(
      "End date must be after start date"
    ),
  };
}
