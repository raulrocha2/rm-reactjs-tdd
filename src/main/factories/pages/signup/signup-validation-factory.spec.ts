
import { ValidationBuilder as Builder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validation-composite/validation-composite'
import { makeSignUpValidation } from './signup-validation-factory'

describe('SignValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(5).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
