import { AccountModel } from '../models/account-model'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfimation: string
}

export interface IAddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
