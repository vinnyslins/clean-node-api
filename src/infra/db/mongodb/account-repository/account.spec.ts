import { MongoHelper } from '../helpers/mongo-helper'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // it('should return an account on success', () => {
  //   const sut = new AccountMongoRepository()
  //   const account = sut.add({
  //     name: 'any_name',
  //     email: 'any_email@mail.com',
  //     password: 'any_password',
  //   })

  //   expect(account).toEqual({
  //     id: expect.any(String),
  //     name: 'any_name',
  //     email: 'any_email@mail.com',
  //     password: 'any_password',
  //   })
  // })
})
