import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols/i-field-validation'

export class CompareFieldsValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) { }

  validate (value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null
  }
}
