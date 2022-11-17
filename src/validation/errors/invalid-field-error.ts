
export class InvalidFieldError extends Error {
  constructor () {
    super('Valor inserido invalido!')
    this.name = 'InvalidFieldError'
  }
}
