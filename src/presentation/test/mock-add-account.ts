import { AddAccountParams, IAddAccount } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account-model'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements IAddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callsCount = 0
  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
