import { faker } from '@faker-js/faker'
import { InvalidFieldError } from '../errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if length of value is invalid', () => {
    const minLength = 6
    const sut = new MinLengthValidation(faker.database.column(), minLength)
    const error = sut.validate(faker.random.alpha(3))
    expect(error).toEqual(new InvalidFieldError())
  })
})
