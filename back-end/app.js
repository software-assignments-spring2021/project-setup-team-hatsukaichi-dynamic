const express = require('express')
const axios = require('axios')
const app = express()
const morgan = require("morgan") // middleware for logging of incoming HTTP requests
require('dotenv').config({ silent: true })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev")) // dev is a concise color-coded default style for morgan

app.get('/tv_users', (req, res, next) => {
    axios.get(`https://my.api.mockaroo.com/tv_users.json?key=${process.env.MOCKAROO_KEY}`)
        .then( (response) => {
            res.json(response.data)
        })
        .catch( (err) => {
            next(err)
        })
});

app.get('/shows/:id', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/shows/${req.params.id}.json?key=${process.env.API_KEY_MOCKAROO}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.get('/', (req, res, next) => {
  res.send("TV Tracker App Home page!")
})

app.get('/tv_users/:id', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=${process.env.API_KEY_MOCKAROO}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.post('/tv_users', (req, res, next) => {
    axios.post(`https://my.api.mockaroo.com/tv_users.json?key=${process.env.API_KEY_MOCKAROO}&__method=POST`, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then((response) => {
        console.log(response)
        res.json(response.data)
    })
    .catch((err) => {
        next(err)
    })
});

app.get('/shows', (req, res, next) => {
  axios
    .get(
      `https://my.api.mockaroo.com/shows.json?key=${process.env.API_KEY_MOCKAROO}`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.patch('/tv_users/:id', (req, res, next) => {
  axios
    .patch(
      `https://my.api.mockaroo.com/tv_users/${req.params.id}.json?key=${process.env.API_KEY_MOCKAROO}&__method=PATCH`,
      {
        username:
          req.body.username == null ? req.query.username : req.body.username,
        password:
          req.body.password == null ? req.query.password : req.body.password,
        bio: req.body.bio == null ? req.query.bio : req.body.bio,
        shows: req.body.shows == null ? req.query.shows : req.body.shows
      }
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      next(err)
    })
})

app.get('/shows-trakt', (req, res, next) => {
  //return popular shows if query is not given
  if (Object.keys(req.query).length === 0){
    axios
      .get(
        `https://api.trakt.tv/shows/popular`,{
          headers: {
            'trakt-api-version': 2, 
            'trakt-api-key':`${process.env.API_KEY_TRAKT}`,
            'Accept': '*/*'
          }
        }
      )  
      .then((response) => {
        res.json(response.data)
      })
      .catch((err) => {
        next(err)
      })
  //otherwise return requested show information
  }else{
    axios
      .get(
        `https://api.trakt.tv/search/show,movie?query=${req.query.query}&Content-Type=application/json&trakt-api-version=2&trakt-api-key=${process.env.API_KEY_TRAKT}`,{
          headers: {
            'trakt-api-version': 2, 
            'trakt-api-key':`${process.env.API_KEY_TRAKT}`,
            'Accept': '*/*'
          }
        }
      )
      .then((response) => {
        res.json(response.data)
      })
      .catch((err) => {
        next(err)
      })
  }
})

app.get('/shows-trakt/:id', (req, res, next) => {
  //return Bad Request error if content type is not given
  if (Object.keys(req.query).length === 0){
    const errorMessage = {
    status: 400,
    error:"Bad Request - request couldn't be parsed",
    message: "Content type (show or movie) is not indicated e.g. /shows-trakt/1390/?type=movie",
    path: "/shows-trakt/:id",
  }
  res.json(errorMessage);
  //return extended show information 
  }else if (req.query.type=='show'){
    axios
      .get(
        `https://api.trakt.tv/shows/${req.params.id}`,{
          params: {
            'extended':'full',
          },
          headers: {
            'trakt-api-version':'2', 
            'trakt-api-key':`${process.env.API_KEY_TRAKT}`,
            'extended':'full',
            'Accept':'*/*', //necessary since requests have multiple content-types
            'User-Agent':'request'
          }
        }
      )
      .then((response) => {
        res.json(response.data)
      })
      .catch((err) => {
        next(err)
      })
  //return extended movie information     
  }else if (req.query.type=='movie'){
    axios
      .get(
        `https://api.trakt.tv/movies/${req.params.id}`,{
          params: {
            'extended':'full',
          },
          headers: { 
            'trakt-api-version':'2', 
            'trakt-api-key':`${process.env.API_KEY_TRAKT}`,
            'extended':'full',
            'Accept':'*/*',
            'User-Agent':'request'
          }
        }
      )
      .then(responseA => {
        //add response from Trakt API to final response object
        response_final=responseA.data; 
        //return imdb_id value which is used for retrieving poster url 
        //by making a get request to Fanart API
        return responseA.data.ids.imdb; 
      })
      .then(responseB => {
        axios
          .get(
            `https://webservice.fanart.tv/v3/movies/${responseB}?api_key=c5c5284883d4cc5e0999afc1a5a2c96d`
          )//if the movie is not found in Fanart database
          if (responseB.data==null) {
            //send available movie info without poster
            res.json(response_final); 
            //throw error to break the chain (catch doesn't break)
            throw new Error("404 Not Found in Fanart database! ")
          }//if the movie is found in Fanart database
          else //return the data
            return responseB.data; 
      })
      .then(responseC => {
        //if posters are available, append their urls to the info object
        if (responseC.movieposter!=null){
          for(let i=0;i<responseC.movieposter.length; i++)
            response_final['poster-url-'+String(i)]=responseC.movieposter[i].url;
        }//send movie info and, if available, poster info
        res.json(response_final);
      })
      .catch((err) => {
        next(err)
      })
  //return Not Found error if content is not found 
  }else{
      const errorMessage = {
      status: 404,
      error:"Not Found - method exists, but no record found",
      message: "Content with the indicated Trakt id is not found",
      path: "/shows-trakt/:id"
      }
    res.json(errorMessage);
  }
})

module.exports = app
