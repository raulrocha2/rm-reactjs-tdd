import { AccountModel } from '@/domain/models/account-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (loginData: AuthenticationParams) => Promise<AccountModel>
}
