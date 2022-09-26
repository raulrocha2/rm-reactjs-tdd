import { HttpPostParams, IHttpPostClient } from "../protocols/http/http-post-client"

export class HttpPostClientSpy implements IHttpPostClient {
  url?: string
  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}