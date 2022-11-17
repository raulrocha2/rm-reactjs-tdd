import { IFieldValidation } from '../protocols/i-field-validation'
import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

const makeSut = (validators: IFieldValidation[]): ValidationComposite => {
  const sut = new ValidationComposite(validators)
  return sut
}

describe('ValidationComposite', () => {
  test('Should return error if any validations fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy.error = new Error('first_error_message')
    fieldValidationSpy2.error = new Error('second_error_message')
    const sut = makeSut([
      fieldValidationSpy,
      fieldValidationSpy2
    ])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
