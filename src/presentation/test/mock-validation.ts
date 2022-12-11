import { IValidation } from '../protocols/validaion'

export class ValidationStub implements IValidation {
  errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
