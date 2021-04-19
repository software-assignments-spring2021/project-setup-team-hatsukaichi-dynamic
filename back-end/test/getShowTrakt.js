const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const { mockErrorMessage, mockGOT, mockScnd, mockShowAPI } = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /shows-trakt/353', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK and data', async () => {
    stub = sinon
      .stub(axios, 'get')
      .onFirstCall().resolves({
        data:
          {
            mockGOT
          }
      })
      .onSecondCall().resolves({
        data:
        {
          mockScnd
        }
      })
    const res = await chai.request(server).get('/shows/1')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({ mockGOT })
    sinon.assert.calledTwice(stub)
  })
})
