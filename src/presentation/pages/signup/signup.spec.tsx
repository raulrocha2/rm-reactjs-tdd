import { Helper } from '@/presentation/test'
import { RenderResult, render } from '@testing-library/react'
import React from 'react'
import Signup from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(

      <Signup />
  )
  return {
    sut
  }
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonisDisabled(sut, 'submit', true)
    Helper.testStatusField(sut, 'name', validationError)
    Helper.testStatusField(sut, 'email', validationError)
    Helper.testStatusField(sut, 'password', validationError)
    Helper.testStatusField(sut, 'passwordConfirmation', validationError)
  })
})
