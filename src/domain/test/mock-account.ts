import { AuthenticationParams } from '@/domain/usecases/i-authentication'
import { faker } from '@faker-js/faker'
import { AccountModel } from '../models/account-model'
import { AddAccountParams } from '../usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: 'accessToken-hash'
})

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfimation: password
  }
}
