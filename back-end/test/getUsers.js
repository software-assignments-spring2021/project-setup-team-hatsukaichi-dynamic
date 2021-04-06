const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const { createMockUser } = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /tv_users', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK', async () => {
    stub = sinon
      .stub(axios, 'get')
      .resolves({ status: 200, data: { id: 1, name: 'sample user' } })
    const res = await chai.request(server).get('/tv_users')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({ id: 1, name: 'sample user' })
    sinon.assert.calledOnce(stub)
  })
  it('should return mocked data when stubbed Mockaroo call results in 500 error', async () => {
    stub = sinon.stub(axios, 'get').rejects({
      response: {
        status: 500,
        message: 'mockaroo api limit exceeded (probably)'
      }
    })
    const res = await chai.request(server).get('/tv_users')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal([
      createMockUser(1),
      createMockUser(2),
      createMockUser(3)
    ])
    sinon.assert.calledOnce(stub)
  })
})
