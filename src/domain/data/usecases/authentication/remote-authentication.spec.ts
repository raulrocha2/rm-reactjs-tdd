import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"
import { faker } from '@faker-js/faker'

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
    sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})