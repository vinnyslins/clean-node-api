import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const sut = makeSut()

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)
    const sut = makeSut()

    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(jest.fn())
    const sut = makeSut()

    sut.isValid('valid_email@mail.com')

    expect(validator.isEmail).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
