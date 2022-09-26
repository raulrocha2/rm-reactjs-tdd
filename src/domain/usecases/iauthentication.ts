import { AccountModel } from "../models/account-model"

type LoginParams = {
  email: string
  password: string
}


export interface IAuthentication {
  auth (loginData: LoginParams): Promise<AccountModel> 
}