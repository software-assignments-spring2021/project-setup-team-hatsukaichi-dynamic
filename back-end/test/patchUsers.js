/*
const server = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const { mockUserUpdate, mockSingleShow } = require('../MockData.js')
var expect = chai.expect
chai.use(chaiHttp)

//TODO: update to use db call to unit test db

describe('PATCH /tv_users/1', () => {
  const patchURL = `https://my.api.mockaroo.com/tv_users/1.json?key=${process.env.API_KEY_MOCKAROO}&__method=PATCH`
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should update all user info fields', async () => {
    stub = sinon.stub(axios, 'patch').resolves({
      data: {
        username: 'newUsername1',
        password: 'newPassword1',
        email: 'newemail@gmail.com',
        bio: 'old bio',
        shows: [mockSingleShow]
      }
    })
    const res = await chai
      .request(server)
      .patch('/tv_users/1')
      .send({
        username: 'newUsername',
        password: 'newPassword1',
        email: 'newemail@gmail.com',
        shows: [mockSingleShow]
      })
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: 'newUsername',
      password: 'newPassword1',
      email: 'newemail@gmail.com',
      bio: 'old bio',
      shows: [mockSingleShow]
    })
    sinon.assert.calledOnce(stub)
    sinon.assert.calledWith(stub, patchURL, {
      username: 'newUsername',
      password: 'newPassword1',
      email: 'newemail@gmail.com',
      shows: [mockSingleShow]
    })
  })
  it('should update only the password', async () => {
    stub = sinon.stub(axios, 'patch').resolves({
      data: {
        username: 'oldUsername',
        password: 'newPassword1',
        email: 'oldEmail@gmail.com',
        shows: []
      }
    })
    const res = await chai
      .request(server)
      .patch('/tv_users/1')
      .send({ password: 'newPassword1' })
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: 'oldUsername',
      password: 'newPassword1',
      email: 'oldEmail@gmail.com',
      shows: []
    })
    sinon.assert.calledOnce(stub)
    sinon.assert.calledWith(stub, patchURL, { password: 'newPassword1' })
  })
  it('should return mocked data when stubbed Mockaroo call results in 500 error', async () => {
    stub = sinon.stub(axios, 'patch').rejects({
      response: {
        status: 500,
        message: 'mockaroo api limit exceeded (probably)'
      }
    })
    const res = await chai.request(server).patch('/tv_users/1').send({
      username: 'mlaffan0',
      password: 'njb9oAB111',
      email: 'jparkin0@utexas.edu'
    })
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(
      mockUserUpdate(1, {
        username: 'mlaffan0',
        password: 'njb9oAB111',
        email: 'jparkin0@utexas.edu'
      })
    )
    sinon.assert.calledOnce(stub)
    sinon.assert.calledWith(stub, patchURL, {
      username: 'mlaffan0',
      password: 'njb9oAB111',
      email: 'jparkin0@utexas.edu'
    })
  })
  it('should return a 400 error if invalid form answers are provided', async () => {
    stub = sinon.stub(axios, 'post').rejects({
      response: {
        status: 400,
        errors: []
      }
    })
    const res = await chai.request(server).post('/tv_users').send({
      username: 'testUser',
      password: 'invalid Password1',
      email: 'notanemail'
    })
    expect(res.status).to.equal(400)
    expect(res.body.errors).to.deep.equal([
      {
        value: 'notanemail',
        msg: 'Invalid value',
        param: 'email',
        location: 'body'
      },
      {
        value: 'invalid Password1',
        msg: 'Invalid value',
        param: 'password',
        location: 'body'
      }
    ])
  })
})
*/
