const express = require('express');
const movieModuleApi = require('../models/movie');
const validate = require('../models/validate')
const app = express();
app.use(express.json());
const router = express.Router();


/* ---------- To manage the entire collection of movies resource ------------*/
// get All Movies
app.get('/api/movies', (req, res) => {
  movieModuleApi.getAllMovies()
    .then((val) => {
      res.send(val);
    });
});


// To add A new MOVIE

app.post('/api/movies', (req, res) => {
  const {error} = validate.ValidatorForMovies(req.body)
  if(error)
  {
    return res.status(400).send("error.details[0].message");
  }
  movieModuleApi.addNewMovie(req.body)
    .then((data) => {
      res.send(data);
    });
});




/** *-------- To manage a single movie resource------------- */

// get the movie with id name(to retrieve  a Movie)
app.get('/api/movies/:movieId', (req, res) => {
  movieModuleApi.getMovieWithGivenId(req.params.movieId)
    .then((val) => {
      res.send(val);
    });
});

// to Update The Details of A movie
app.put('/api/movies/:movieId', (req, res) => {
  const {error} = validate.ValidatorForMoviesUpdate(req.body)
  if(error)
  {
    return res.status(400).send("error.details[0].message");
  }
  movieModuleApi.updateMovieWithGivenId(req.params.movieId, req.body)
    .then((val) => {
      res.send(val);
    });
});

// TO remove a movie
app.delete('/api/movies/:movieId', (req, res) => {
  movieModuleApi.deleteMovieWithGivenId(req.params.movieId)
    .then((val) => {
      res.send(val);
    });
});


const port = process.env.portNumber || 3000;
app.listen(port, () => {
  console.log('Node Server is running');
});

