import { EmailInUseError } from '@/domain/errors'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { RenderResult, render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import React from 'react'
import Signup from './signup'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(

      <Signup
        validation={validationStub}
        addAccount={addAccountSpy}
      />
  )
  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = async (sut: RenderResult, name = faker.internet.userName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  await waitFor(() => fireEvent.submit(form))
  await waitFor(() => form)
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
    Helper.testStatusField(sut, 'password', validationError)
    Helper.testStatusField(sut, 'passwordConfirmation', validationError)
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

  test('Should show password error if Validation  fails', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation  fails', () => {
    const validationError = faker.random.words(2)
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', async () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.testStatusField(sut, 'name')
  })

  test('Should show valid email state if Validation succeeds', async () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', async () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', async () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonisDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementsExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.internet.userName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words(2)
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    await waitFor(() => Helper.testElementText(sut, 'main-error', error.message))
    Helper.testChildCount(sut, 'error-wrap', 1)
  })
})
