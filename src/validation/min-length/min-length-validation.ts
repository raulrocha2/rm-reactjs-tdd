import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols/i-field-validation'

export class MinLengthValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) { }

  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}
