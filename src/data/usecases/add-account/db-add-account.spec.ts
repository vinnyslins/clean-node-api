import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const account = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'hashed_password',
      }

      return account
    }
  }

  return new AddAccountRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()

  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return { sut, encrypterStub, addAccountRepositoryStub }
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

  it('shoud call AddAccountRepository with correct data', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    }

    await sut.add(accountData)

    const expected = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
    }

    expect(addAccountRepositoryStub.add).toHaveBeenCalledWith(expected)
  })

  it('shoud throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const mockedError = new Error('any_error')
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockRejectedValueOnce(mockedError)

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    }

    await expect(sut.add(accountData)).rejects.toThrow(mockedError)
  })
})
