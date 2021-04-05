const server = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
var expect = chai.expect
chai.use(chaiHttp)

describe('POST /tv_users', () => { //update all fields of user info
  it('should update all user info fields', async () => {
    const stub = sinon.stub(axios, 'post').resolves({data: {
      username: 'newUsername', 
      email: 'newEmail@gmail.com',
      password: 'newPassword',}})
    const res = await chai.request(server).post('/tv_users')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: 'newUsername', 
      email: 'newEmail@gmail.com',
      password: 'newPassword'})
      stub.restore()
    })
  it('should update only email', async () => { 
    const stub = sinon.stub(axios, 'post').resolves({data: {
      username: null,
      email: 'newEmail@gmail.com',
      password: null,
    }})
    const res = await chai.request(server).post('/tv_users')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: res.body.username, 
      email: 'newEmail@gmail.com',
      password: res.body.password})
      stub.restore()
    })
  it('should return 500', async () => { //error
    const stub = sinon.stub(axios, 'post').rejects(true)
    const res = await chai.request(server).post('/tv_users')
    expect(res.status).to.equal(500)
    stub.restore()
    })
})