const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const {
  mockTraktShow,
  mockPosterCall,
  mockSeasonsCall,
  mockExpectedShow
} = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /shows/1', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK and data', async () => {
    stub = sinon.stub(axios, 'get')
    stub.onFirstCall().resolves({ data: mockTraktShow }) // initial trakt call
    stub.onSecondCall().resolves({ data: mockPosterCall }) // poster call
    stub.onThirdCall().resolves({ data: mockSeasonsCall }) // seasons call
    const res = await chai.request(server).get('/shows/1390')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(mockExpectedShow)
    sinon.assert.calledThrice(stub)
  })
  //TODO: Add error handling test
})
