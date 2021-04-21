const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const { mockErrorMessage, mockGOT, mockSeasons, mockFileInfo, mockShowAPI } = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /shows-trakt/353', () => {
  let stub
  afterEach(() => {
    stub.restore()
  })
  it('should return 200 OK and data', async () => {
    stub = sinon.stub(axios, 'get')
    stub.onFirstCall().resolves({data: mockGOT})
    stub.onSecondCall().resolves({data: mockSeasons})
    stub.onThirdCall().resolves({data: mockFileInfo})
    const res = await chai.request(server).get('/shows-trakt/353?type=show')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(mockGOT)
    sinon.assert.calledThrice(stub)
  })
})
