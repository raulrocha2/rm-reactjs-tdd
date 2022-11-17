import { EmailValidation } from '../email/email-validation'
import { IFieldValidation } from '../protocols/i-field-validation'
import { RequiredFieldValidation } from '../require-field/require-field-validation'

export class ValidationBuilder {
  constructor (
    private readonly fieldName: string,
    private readonly validations: IFieldValidation[]
  ) { }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  build (): IFieldValidation[] {
    return this.validations
  }
}
