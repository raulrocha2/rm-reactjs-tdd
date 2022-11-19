import { AxiosHttpClient } from '@/infra/http/axio-http-client/axios-http-client'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
