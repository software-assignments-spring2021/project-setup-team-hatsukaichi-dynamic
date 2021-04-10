const chai = require('chai')
const chaiHttp = require('chai-http')
const axios = require('axios')
const sinon = require('sinon')
const expect = chai.expect
const server = require('../app.js')
const { mockErrorMessage, mockPopularShows } = require('../MockData.js')
chai.use(chaiHttp)

describe('GET /shows-trakt', () => {
  let stub

  afterEach(() => {
    stub.restore()
  })

  it('should return 200 OK and data', async () => {
    stub = sinon
      .stub(axios, 'get')
      .resolves({ data: { title: 'sample title' } })
    const res = await chai.request(server).get('/shows-trakt')
    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal({
      title: 'sample title'
    })
    sinon.assert.calledOnce(stub)
  })
  describe('when a search term query is provided', () => {
    it('should return 200 OK and data', async () => {
      stub = sinon.stub(axios, 'get').resolves({
        data: [
          {
            type: 'movie',
            score: 5.1521816,
            movie: {
              title: 'Nature of the Beast',
              year: 2017,
              ids: {
                trakt: 289980,
                slug: 'nature-of-the-beast-2017',
                imdb: 'tt6171452',
                tmdb: 444606
              }
            }
          }
        ]
      })
      const res = await chai
        .request(server)
        .get('/shows-trakt?query=dennis+skinner+nature+of+the+beast')
      expect(res.status).to.equal(200)
      expect(res.body).to.deep.equal([
        {
          type: 'movie',
          score: 5.1521816,
          movie: {
            title: 'Nature of the Beast',
            year: 2017,
            ids: {
              trakt: 289980,
              slug: 'nature-of-the-beast-2017',
              imdb: 'tt6171452',
              tmdb: 444606
            }
          }
        }
      ])
      sinon.assert.calledOnce(stub)
    })
  })
})