const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const server = require('../app.js')
const User = require('../models/User.js')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

chai.use(chaiHttp)

describe('GET /tv_users', function () {
  before(async () => {
    // Make sure the database is empty first
    await User.deleteMany({})
    // Populate the test database with some users before the first test
    const users = [
      {
        username: 'user1',
        password: 'validPwd1',
        email: 'email1@gmail.com',
        bio: 'User 1 bio',
        img: 'https://i.imgur.com/IHOjDbq.jpg',
        shows: []
      },
      {
        username: 'user2',
        password: 'validPwd2',
        email: 'email2@gmail.com',
        bio: 'User 2 bio',
        img: 'https://i.imgur.com/IHOjDbq.jpg',
        shows: []
      }
    ]
    await User.create(users)
  })

  afterEach(async () => {
    // Clear the database of any users after each test (so the second test has no users for it)
    await User.deleteMany({})
    // Clean up counter incrementation for id field
    await User.counterReset('id', (err) => {})
  })

  it('should return 200 OK', async () => {
    const res = await chai.request(server).get('/tv_users')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body.length).to.equal(2)

    // for each item in the response, expect it to have the proper fields
    res.body.forEach((item) => {
      expect(item).to.have.property('_id')
      expect(item).to.have.property('id')
      expect(item).to.have.property('username')
      expect(item).to.have.property('password')
      expect(item).to.have.property('bio')
      expect(item).to.have.property('img')
      expect(item).to.have.property('shows')
    })
  })
  it('should return 200 OK and empty array when no users', async () => {
    const res = await chai.request(server).get('/tv_users')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body.length).to.equal(0)
  })
}).timeout(3000)
