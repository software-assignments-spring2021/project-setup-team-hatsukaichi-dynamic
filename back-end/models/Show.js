const mongoose = require('mongoose')

const ShowSchema = new mongoose.Schema({
  isMovie: { type: Boolean, required: true }, //true or false = movie or show
  traktId: { type: Number, required: true }, //unique within a given type; there is at most one movie with a given ID, but there can be a show with the same ID.
  list: { type: String, required: true }, //in progress or watched list
  season: { type: Number, required: false }, //shows have season and episode progress, movies do not, so this is not required
  episode: { type: Number, required: false },
  platform: { type: String, required: true } //netflix, prime, etc
})

module.exports = mongoose.model('Show', ShowSchema)
