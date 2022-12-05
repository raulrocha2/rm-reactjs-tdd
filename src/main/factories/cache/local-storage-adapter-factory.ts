import { ISetStorage } from '@/data/protocols/http/cache/i-set-storage'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): ISetStorage => {
  return new LocalStorageAdapter()
}
