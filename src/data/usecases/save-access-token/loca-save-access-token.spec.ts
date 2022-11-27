import { SetStorageSpy } from "@/data/test"
import { LocalSaveAccessToken } from "./loca-save-access-token"
import { faker } from "@faker-js/faker"


describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correc value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.random.alphaNumeric(5)
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})