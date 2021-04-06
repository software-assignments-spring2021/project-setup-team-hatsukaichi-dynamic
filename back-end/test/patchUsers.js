const server = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
var expect = chai.expect
chai.use(chaiHttp)

describe('PATCH /tv_users/1', () => {
  const patchURL = `https://my.api.mockaroo.com/tv_users/1.json?key=${process.env.API_KEY_MOCKAROO}&__method=PATCH`
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should update all user info fields', async () => {
    stub = sinon.stub(axios, 'patch').resolves({
      data: {
        username: 'newUsername',
        password: 'newPassword',
        email: 'newemail@gmail.com',
        bio: 'old bio',
        shows: [{ id: 1, name: 'sample show' }]
      }
    })
    const res = await chai
      .request(server)
      .patch('/tv_users/1')
      .send({
        username: 'newUsername',
        password: 'newPassword',
        email: 'newemail@gmail.com',
        shows: [{ id: 1, name: 'sample show' }]
      })
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: 'newUsername',
      password: 'newPassword',
      email: 'newemail@gmail.com',
      bio: 'old bio',
      shows: [{ id: 1, name: 'sample show' }]
    })
    sinon.assert.calledOnce(stub)
    sinon.assert.calledWith(stub, patchURL, {
      username: 'newUsername',
      password: 'newPassword',
      email: 'newemail@gmail.com',
      shows: [{ id: 1, name: 'sample show' }]
    })
  })
  it('should update only the password', async () => {
    stub = sinon.stub(axios, 'patch').resolves({
      data: {
        username: 'old username',
        password: 'newPassword',
        email: 'oldEmail@gmail.com',
        shows: []
      }
    })
    const res = await chai
      .request(server)
      .patch('/tv_users/1')
      .send({ password: 'newPassword' })
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: 'old username',
      password: 'newPassword',
      email: 'oldEmail@gmail.com',
      shows: []
    })
    sinon.assert.calledOnce(stub)
    sinon.assert.calledWith(stub, patchURL, { password: 'newPassword' })
  })
})
