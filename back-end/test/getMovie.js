const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const {
  mockTraktMovie,
  mockPosterCallMovie,
  mockExpectedMovie
} = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /movies/:id', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK and data', async () => {
    stub = sinon.stub(axios, 'get')
    stub.onFirstCall().resolves({ data: mockTraktMovie }) // initial trakt call
    stub.onSecondCall().resolves({ data: mockPosterCallMovie }) // poster call
    const res = await chai.request(server).get('/movies/1390')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(mockExpectedMovie)
    sinon.assert.calledTwice(stub)
  })
})
