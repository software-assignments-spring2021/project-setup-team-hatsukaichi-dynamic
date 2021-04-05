const server = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
var expect = chai.expect
chai.use(chaiHttp)

describe('PATCH /tv_users/1', () => { //update all fields of user info
  it('should update all user info fields', async () => {
    const stub = sinon.stub(axios, 'patch').resolves({data: {
      username: 'newUsername', 
      password: 'newPassword',
      email: 'newemail@gmail.com',
      shows: 'new show 1'}})
    const res = await chai.request(server).patch('/tv_users/1')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: 'newUsername', 
      password: 'newPassword',
      email: 'newemail@gmail.com',
      shows: 'new show 1'})
      stub.restore()
    })
  it('should update only the password', async () => { //update 1 field of user info
    const stub = sinon.stub(axios, 'patch').resolves({data: {
      username: null,
      password: 'newPassword',
      email: null,
      shows: null
    }})
    const res = await chai.request(server).patch('/tv_users/1')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      username: res.body.username, 
      password: 'newPassword',
      email: res.body.email,
      shows: res.body.shows})
      stub.restore()
    })
  it('should return 500', async () => { //error
    const stub = sinon.stub(axios, 'patch').rejects(true)
    const res = await chai.request(server).patch('/tv_users/1')
    expect(res.status).to.equal(500)
    stub.restore()
    })
})