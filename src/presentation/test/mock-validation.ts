import { IValidation } from '../protocols/validaion'

export class ValidationStub implements IValidation {
  errorMessage: string

  validate (fieldName: string, fieldValue: string): string {
    return this.errorMessage
  }
}
