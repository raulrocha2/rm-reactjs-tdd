import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-facotry'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
    />
  )
}
