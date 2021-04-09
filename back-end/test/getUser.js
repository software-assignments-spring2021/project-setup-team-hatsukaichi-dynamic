const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const { mockErrorMessage, mockUserAPI } = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /tv_users/1', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK and data', async () => {
    stub = sinon
      .stub(axios, 'get')
      .resolves({ status: 200, data: { id: 1, name: 'sample user' } })
    const res = await chai.request(server).get('/tv_users/1')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({ id: 1, name: 'sample user' })
    sinon.assert.calledOnce(stub)
  })
  describe('when Mockaroo returns with 500 error', () => {
    it('should return 200 with mock data if user exists', async () => {
      stub = sinon.stub(axios, 'get').rejects(mockErrorMessage)
      const res = await chai.request(server).get('/tv_users/1')
      expect(res.status).to.equal(200)
      expect(res.body).to.deep.equal(mockUserAPI[1])
      sinon.assert.calledOnce(stub)
    })
    it('should return 404 with error message if user does not exist', async () => {
      stub = sinon.stub(axios, 'get').rejects(mockErrorMessage)
      const res = await chai.request(server).get('/tv_users/5')
      expect(res.status).to.equal(404)
      expect(res.body).to.deep.equal('user with requested id not found')
      sinon.assert.calledOnce(stub)
    })
  })
})
