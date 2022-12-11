import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols/i-field-validation'

export class CompareFieldsValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) { }

  validate (input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null
  }
}
