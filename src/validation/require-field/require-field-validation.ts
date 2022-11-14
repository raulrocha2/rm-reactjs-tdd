import { RequiredFieldError } from '@/validation/errors'
import { IFieldValidation } from './protocols/i-field-validation'

export class RequiredFieldValidation implements IFieldValidation {
  constructor (readonly field: string) { }
  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}
