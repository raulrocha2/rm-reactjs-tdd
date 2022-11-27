import { ISetStorage } from "@/data/protocols/http/cache/i-set-storage";
import { ISaveAccessToken } from "@/domain/usecases/i-save-access-token";


export class LocalSaveAccessToken implements ISaveAccessToken {
  constructor (
    private readonly setStorage: ISetStorage
  ) { }

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }

}
