import { Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return { sut, encrypterStub }
}

describe('DbAddAcount Usecase', () => {
  it('shoud call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    }

    await sut.add(accountData)

    expect(encrypterStub.encrypt).toHaveBeenCalledWith(accountData.password)
  })

  it('shoud throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    const mockedError = new Error('any_error')
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(mockedError)

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    }

    await expect(sut.add(accountData)).rejects.toThrow(mockedError)
  })
})
