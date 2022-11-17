import { InvalidFieldError } from '../errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('invalid-email.com')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if email is valid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('valid@email.com')
    expect(error).toBeFalsy()
  })
})
