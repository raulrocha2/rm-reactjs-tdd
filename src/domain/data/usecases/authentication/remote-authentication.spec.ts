import { RemoteAuthentication } from "./remote-authentication"


describe('Remote Authentication', () => {
  test('Should call HttpPostClient with correct URL', () => {
    class HttpPostClientSpy implements IHttpPostClient {
      url?: string
      async post(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    sut.auth()
    expect(httpPostClientSpy.url).toBe('any_url')
  })
})