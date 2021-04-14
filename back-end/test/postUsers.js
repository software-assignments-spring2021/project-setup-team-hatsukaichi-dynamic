const server = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const mongoose = require('mongoose')
const { createMockUser } = require('../MockData.js')
var expect = chai.expect
chai.use(chaiHttp)

describe('POST /tv_users', () => {
  const postURL = `https://my.api.mockaroo.com/tv_users.json?key=${process.env.API_KEY_MOCKAROO}&__method=POST`
  let stub

  afterEach(() => {
    stub.restore()
  })

  after(() => {
    //do this in whatever the last test is alphabetically
    mongoose.connection
      .close()
      .then((resolved) =>
        console.log('The connection to the database has been closed.')
      )
      .catch((err) => console.log(err))
  })

  it('should create all user info fields', async () => {
    stub = sinon.stub(axios, 'post').resolves({
      data: {
        id: 'sampleID',
        username: 'newUsername',
        password: 'newPassword',
        email: 'newemail@gmail.com',
        bio: '',
        img: '',
        shows: []
      }
    })
    const res = await chai.request(server).post('/tv_users').send({
      username: 'newUsername',
      password: 'newPassword',
      email: 'newemail@gmail.com'
    })
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      id: 'sampleID',
      username: 'newUsername',
      password: 'newPassword',
      email: 'newemail@gmail.com',
      bio: '',
      img: '',
      shows: []
    })
    sinon.assert.calledOnce(stub)
    sinon.assert.calledWith(stub, postURL, {
      username: 'newUsername',
      password: 'newPassword',
      email: 'newemail@gmail.com'
    })
  })
  it('should return new data when stubbed Mockaroo call results in 500 error', async () => {
    stub = sinon.stub(axios, 'post').rejects({
      response: {
        status: 500,
        message: 'mockaroo api limit exceeded (probably)'
      }
    })
    const res = await chai.request(server).post('/tv_users').send({
      username: 'test user',
      password: 'test password',
      email: 'testEmail@gmail.com'
    })
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(
      createMockUser(1, 'test user', 'test password', 'testEmail@gmail.com')
    )
    sinon.assert.calledOnce(stub)
    sinon.assert.calledWith(stub, postURL, {
      username: 'test user',
      password: 'test password',
      email: 'testEmail@gmail.com'
    })
  })
})
