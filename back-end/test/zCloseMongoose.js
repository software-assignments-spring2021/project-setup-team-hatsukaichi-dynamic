const mongoose = require('mongoose')
const server = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

mongoose.connection
  .close()
  .then((resolved) =>
    console.log('The connection to the database has been closed.')
  )
  .catch((err) => console.log(err))
