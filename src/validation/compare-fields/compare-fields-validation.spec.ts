import { faker } from "@faker-js/faker"
import { InvalidFieldError } from "../errors"
import { CompareFieldsValidation } from "./compare-fields-validation."

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })

})