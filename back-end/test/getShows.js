const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const { mockErrorMessage, mockAllShows } = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /shows', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK', async () => {
    // This effectively makes response.data in the show route equal to
    // {id: 1, name: 'sample show}
    stub = sinon
      .stub(axios, 'get')
      .resolves({ data: { id: 1, name: 'sample show' } })
    const res = await chai.request(server).get('/shows')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({ id: 1, name: 'sample show' })
  })
  it('should return mocked data when stubbed Mockaroo call results in 500 error', async () => {
    stub = sinon.stub(axios, 'get').rejects(mockErrorMessage)
    const res = await chai.request(server).get('/shows')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(mockAllShows)
  })
})
