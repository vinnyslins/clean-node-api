import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: () => Promise.resolve('hashed_value'),
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('shoud call bcrypt with correct data', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(bcrypt.hash).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hashed_value')
  })

  it('should throw if bcrypt throws', async () => {
    const sut = makeSut()
    const mockedError = new Error('error')
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(jest.fn().mockRejectedValueOnce(mockedError))

    expect(sut.encrypt('any_value')).rejects.toThrow(mockedError)
  })
})
