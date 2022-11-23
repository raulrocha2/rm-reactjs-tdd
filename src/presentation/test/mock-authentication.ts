import { AuthenticationParams, IAuthentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account-model'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements IAuthentication {
  account = mockAccountModel()
  loginData: AuthenticationParams
  callsCount = 0
  async auth (loginData: AuthenticationParams): Promise<AccountModel> {
    this.loginData = loginData
    this.callsCount++
    return this.account
  }
}
