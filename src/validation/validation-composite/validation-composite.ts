import { IValidation } from '@/presentation/protocols/validaion'
import { IFieldValidation } from '../protocols/i-field-validation'

export class ValidationComposite implements IValidation {
  constructor (
    private readonly validators: IFieldValidation[]
  ) { }

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(v => v.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) {
        return error.message
      }
    }
  }
}
