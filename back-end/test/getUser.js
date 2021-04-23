const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const server = require('../app.js')
chai.use(chaiHttp)

describe('GET /tv_users/1', () => {
  it('should return 200 OK and data for a valid id', async () => {
    const res = await chai.request(server).get('/tv_users/1')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      __v: 0,
      _id: '6082b46b25895861f652e1df',
      id: 1,
      username: 'testUsername',
      email: 'testEmail@gmail.com',
      password: '$2b$10$kTrfm/ETBk9G1jzWStD6zebSODZSBTXcbg0d5TYMLYDM7MwY8QqE6',
      bio: 'This is my bio.',
      img: 'An image.',
      shows: []
    })
  }).timeout(3000)
  it('should return 404 and an error for a invalid user id', async () => {
    const res = await chai.request(server).get('/tv_users/badid')
    expect(res.status).to.equal(404)
    expect(res.body).to.deep.equal('Error! User with requested ID not found.')
  })
  it('should return 404 and an error for an id with no user', async () => {
    const res = await chai.request(server).get('/tv_users/100000')
    expect(res.status).to.equal(404)
    expect(res.body).to.deep.equal('Error! User with requested ID not found.')
  })
})
