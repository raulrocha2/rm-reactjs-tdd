import { HttpStatusCode } from "@/data/protocols/http"
import { HttpPostClientSpy } from "@/data/test"
import { UnexpectedError } from "@/domain/errors"
import { AccountModel } from "@/domain/models/account-model"
import { mockAddAccount } from "@/domain/test"
import { AddAccountParams } from "@/domain/usecases"
import { faker } from "@faker-js/faker"
import { RemoteAddAccount } from "./remote-add-account"

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
  sut: RemoteAddAccount
}


const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    httpPostClientSpy,
    sut
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy,  sut} = makeSut(url)
    await sut.add(mockAddAccount())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy,  sut} = makeSut()
    const addAccountParams = mockAddAccount()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throw UnexpectedError if HttpPostClient reutrns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccount())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})