import { SetStorageMock } from "@/data/test"
import { LocalSaveAccessToken } from "./loca-save-access-token"
import { faker } from "@faker-js/faker"

type SutTypes = {
  setStorageMock: SetStorageMock
  sut: LocalSaveAccessToken
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correc value', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.alphaNumeric(5)
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})