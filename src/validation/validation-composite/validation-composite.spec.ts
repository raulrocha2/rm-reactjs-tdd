import { faker } from '@faker-js/faker'
import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    fieldValidationsSpy,
    sut
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validations fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    fieldValidationsSpy[0].error = new Error('first_error_message')
    fieldValidationsSpy[1].error = new Error('second_error_message')
    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBe('first_error_message')
  })

  test('Should return null if all validations returns null', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, 'any_value')
    expect(error).toBeFalsy()
  })
})
