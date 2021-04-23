const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
chai.use(chaiHttp)

describe('GET /tv_users/1/logout', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK', async () => {
    stub = sinon.stub(axios, 'get').resolves({
      data: { status: "logout",message:"Successful logout"}
    })
    const res = await chai.request(server).get('/tv_users/1/logout')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      status: "logout",message:"Successful logout"
    })
  })
})
