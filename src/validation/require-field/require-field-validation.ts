import { RequiredFieldError } from '@/validation/errors'
import { IFieldValidation } from '../protocols/i-field-validation'

export class RequiredFieldValidation implements IFieldValidation {
  constructor (readonly field: string) { }
  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
