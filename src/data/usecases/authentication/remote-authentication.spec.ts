import { faker } from '@faker-js/faker'
import { mockAuthentication } from "@/domain/test/mock-authentication"
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'

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

  test('Should throw InvalidCredentialsError if HttpPostClient reutrns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})