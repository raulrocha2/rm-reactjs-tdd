import { faker } from '@faker-js/faker'
import { InvalidFieldError } from '../errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if length of value is invalid', () => {
    const minLength = 6
    const field = faker.database.column()
    const sut = new MinLengthValidation(field, minLength)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(3) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const minLength = 6
    const field = faker.database.column()
    const sut = new MinLengthValidation(field, minLength)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(6) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in shcema', () => {
    const minLength = 6
    const sut = new MinLengthValidation(faker.database.column(), minLength)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(6) })
    expect(error).toBeFalsy()
  })
})
