import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-facotry'

export const makeSignup: React.FC = () => {
  return (
    <Signup
    addAccount={makeRemoteAddAccount()}
    validation={makeSignUpValidation()}
    saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
