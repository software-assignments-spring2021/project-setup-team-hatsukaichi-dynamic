const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
chai.use(chaiHttp)

describe('GET /', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK', async () => {
    stub = sinon.stub(axios, 'get').resolves({ status: 200 })
    const res = await chai.request(server).get('/')
    expect(res.status).to.equal(200)
  })
})
