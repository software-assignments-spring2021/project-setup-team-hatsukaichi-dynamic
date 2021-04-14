const mongoose = require('mongoose')

const ShowSchema = new mongoose.Schema({
  mediaType: { type: String, required: true }, //movie or show
  traktId: { type: Number, required: true }, //unique within a given type; there is only one movie with a given ID, but there can be a show with the same ID.
  list: { type: String, required: true }, //inProgress or watched
  season: { type: Number, required: false },
  episode: { type: Number, required: false },
  platform: { type: String, required: true }
})

module.exports = mongoose.model('Show', ShowSchema)
