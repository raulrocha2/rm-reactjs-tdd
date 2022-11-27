import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/loca-save-access-token"
import { ISaveAccessToken } from "@/domain/usecases"
import { makeLocalStorageAdapter } from "../../cache/local-storage-adapter-factory"

export const makeLocalSaveAccessToken = (): ISaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
