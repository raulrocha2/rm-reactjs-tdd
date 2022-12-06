import { Helper, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { RenderResult, render, cleanup } from '@testing-library/react'
import React from 'react'
import Signup from './signup'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(

      <Signup
        validation={validationStub}
      />
  )
  return {
    sut
  }
}

describe('Signup Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonisDisabled(sut, 'submit', true)
    Helper.testStatusField(sut, 'name', validationError)
    Helper.testStatusField(sut, 'email', validationError)
    Helper.testStatusField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation  fails', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusField(sut, 'name', validationError)
  })

  test('Should show email error if Validation  fails', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusField(sut, 'email', validationError)
  })
})