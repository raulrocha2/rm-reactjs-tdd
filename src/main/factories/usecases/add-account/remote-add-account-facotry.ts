import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { IAddAccount } from '@/domain/usecases'
import { makeApiUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'

export const makeRemoteAddAccount = (): IAddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
