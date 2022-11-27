import { SetStorageSpy } from "@/data/test"
import { LocalSaveAccessToken } from "./loca-save-access-token"
import { faker } from "@faker-js/faker"
import { ISetStorage } from "@/data/protocols/http/cache/i-set-storage"

type SutTypes = {
  setStorageSpy: SetStorageSpy
  sut: LocalSaveAccessToken
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correc value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.alphaNumeric(5)
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})