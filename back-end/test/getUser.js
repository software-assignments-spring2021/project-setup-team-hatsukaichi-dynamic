/*
const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const { mockErrorMessage, mockShowAPI } = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /shows/1', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK and data', async () => {
    stub = sinon
      .stub(axios, 'get')
      .resolves({ data: { id: 1, name: 'sample show' } })
    const res = await chai.request(server).get('/shows/1')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({ id: 1, name: 'sample show' })
    sinon.assert.calledOnce(stub)
  })
  describe('when Mockaroo returns with 500 error', () => {
    it('should return 200 with mock data if show exists', async () => {
      stub = sinon.stub(axios, 'get').rejects(mockErrorMessage)
      const res = await chai.request(server).get('/shows/3')
      expect(res.status).to.equal(200)
      expect(res.body).to.deep.equal(mockShowAPI[3])
      sinon.assert.calledOnce(stub)
    })
    it('should return 404 with error message if show does not exist', async () => {
      stub = sinon.stub(axios, 'get').rejects(mockErrorMessage)
      const res = await chai.request(server).get('/shows/2')
      expect(res.status).to.equal(404)
      expect(res.body).to.deep.equal('show with requested id not found')
      sinon.assert.calledOnce(stub)
    })
  })
})
*/