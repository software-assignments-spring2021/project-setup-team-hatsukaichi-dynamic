/*
const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const User=require('../models/User')
const { mockErrorMessage, mockUserAPI } = require('../MockData.js')
chai.use(chaiHttp)


describe('GET /tv_users/77', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

//sinon.stub(modelName, 'findOne').returns({object to be returned})
  it('should return 200 OK and data for a valid id', async () => {
    stub = sinon.stub(User, 'findOne').returns({
      shows: [],
      _id: '607f3588cad5e05774fdc350',
      id: 77,
      username: 'Alllma',
      email: 'a344@n.edu',
      passwordHash: '$2b$10$bL.ZCz5mqAE3pVaB/6lve.z/LUdunEHSY3zbYAB4/SDUW6cc3usVG',
      bio: 'This is my bio.',
      img: 'An image.'
    })
    const res = await chai.request(server).get('/tv_users/1')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      shows: [],
      _id: '607f3588cad5e05774fdc350',
      id: 77,
      username: 'Alllma',
      email: 'a344@n.edu',
      passwordHash: '$2b$10$bL.ZCz5mqAE3pVaB/6lve.z/LUdunEHSY3zbYAB4/SDUW6cc3usVG',
      bio: 'This is my bio.',
      img: 'An image.'
    })
  })
  */
  /*
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
  })*/
  /*
  it('should return 404 with error message if user does not exist', async () => {
    stub = sinon.stub(axios, 'get').rejects(mockErrorMessage)
    const res = await chai.request(server).get('/tv_users/5')
    expect(res.status).to.equal(404)
    expect(res.body).to.deep.equal('Error! User with requested ID not found.')
  })
})
*/