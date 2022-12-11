import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation.'
import { EmailValidation } from '../email/email-validation'
import { MinLengthValidation } from '../min-length/min-length-validation'
import { RequiredFieldValidation } from '../require-field/require-field-validation'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).min(5).build()
    expect(validations).toEqual([new MinLengthValidation(field, 5)])
  })

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCampare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCampare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCampare)])
  })
})
