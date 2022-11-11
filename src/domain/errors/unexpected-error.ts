export class UnexpectedError extends Error {
  constructor () {
    super('Algo de errado acontenceu. Tente novamente mais tarde.')
    this.name = 'UnexpectedError'
  }
}
