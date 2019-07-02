const express = require('express');
const movieModuleApi = require('../models/movie');
const validate = require('../models/validate')

const router = express.Router();


/* ---------- To manage the entire collection of movies resource ------------*/
// get All Movies
router.get('/', (req, res) => {
  movieModuleApi.getAllMovies()
    .then((val) => {
      res.send(val);
    });
});


// To add A new MOVIE

router.post('/', (req, res) => {
  const {error} = validate.ValidatorForMovies(req.body)
  if(error)
  {
    return res.status(400).send(error.details[0].message);
  }
  movieModuleApi.addNewMovie(req.body)
    .then(data=>res.send(data)).catch(console.error);
  });




/** *-------- To manage a single movie resource------------- */

// get the movie with id name(to retrieve  a Movie)
router.get('/:movieId', (req, res) => {
  movieModuleApi.getMovieWithGivenId(req.params.movieId)
    .then((val) => {
      if (val.length === 0) {
        return res.status(404).send('Item not found');
      }
    })
    .then( movieModuleApi.getMovieWithGivenId(req.params.movieId).then(val=> res.send(val)))
    .catch(console.error);
    });

// to Update The Details of A movie
router.put('/:movieId', (req, res) => {
  movieModuleApi.getMovieWithGivenId(req.params.movieId)
    .then((presence) => {
      if (presence.length === 0) {
        return res.status(404).send('Item not found');
      }
    }).catch(console.error);

  const {error} = validate.ValidatorForMoviesUpdate(req.body)
  if(error)
  {
    return res.status(400).send("error.details[0].message");
  }
  movieModuleApi.updateMovieWithGivenId(req.params.movieId, req.body)
    .then(val => res.send(val)
    .catch(console.error));
  });

// TO remove a movie
router.delete('/:movieId', (req, res) => {
  movieModuleApi.getMovieWithGivenId(req.params.movieId).then((presence) => {
    if (presence.length === 0) {
      return res.status(404).send('Item not found');
    }
  })
  .then(movieModuleApi.deleteMovieWithGivenId(req.params.movieId)
    .then(val =>res.send(val))).catch(console.error);
    
});

module.exports=router;