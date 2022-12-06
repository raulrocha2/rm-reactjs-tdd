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

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

const testButtonisDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    testChildCount(sut, 'error-wrap', 0)
    testButtonisDisabled(sut, 'submit', true)
    testStatusField(sut, 'name', validationError)
    testStatusField(sut, 'email', validationError)
    testStatusField(sut, 'password', validationError)
    testStatusField(sut, 'passwordConfirmation', validationError)
  })
})
