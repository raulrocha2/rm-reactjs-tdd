import { ValidationBuilder as Builder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validation-composite/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().min(5).build()
  ])
}
