const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
chai.use(chaiHttp)

describe('GET /shows', () => {
  let stub;
  before(() => {
    stub = sinon.stub(axios, 'get').resolves({data: ['show one', 'show two']})
  })
  after(() => {
    stub.restore()
  })
  it('should return 200 OK', async () => {
    chai.request(server).get('/shows').then( res => {
      expect(res.status).to.equal(200)
    })
  })
})