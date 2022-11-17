import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols/i-field-validation'

export class EmailValidation implements IFieldValidation {
  constructor (readonly field: string) { }
  validate (value: string): Error {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return emailRegex.test(value) ? null : new InvalidFieldError()
  }
}
