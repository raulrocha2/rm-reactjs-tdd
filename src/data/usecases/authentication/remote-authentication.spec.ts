import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"
import { faker } from '@faker-js/faker'
import { mockAuthentication } from "../../../domain/test/mock-authentication"

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy
  sut: RemoteAuthentication
}


const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    httpPostClientSpy,
    sut
  }
}

describe('Remote Authentication', () => {
  test('Should call HttpPostClient with correct URL', () => {
    const url = faker.internet.url()
    const { httpPostClientSpy,  sut} = makeSut(url)
    sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', () => {
    const { httpPostClientSpy,  sut} = makeSut()
    const authenticatioParams = mockAuthentication()
    sut.auth(authenticatioParams)
    expect(httpPostClientSpy.body).toEqual(authenticatioParams)
  })
})