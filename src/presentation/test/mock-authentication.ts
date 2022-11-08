import { AuthenticationParams, IAuthentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account-model'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements IAuthentication {
  accountModel = mockAccountModel()
  loginData: AuthenticationParams
  async auth (loginData: AuthenticationParams): Promise<AccountModel> {
    this.loginData = loginData
    return Promise.resolve(this.accountModel)
  }
}
