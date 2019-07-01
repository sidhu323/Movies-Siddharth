const db = require('../utils/connectDb');

const connect = db.connectDatabase();

/** ****-----------Query No -6(Get All Movies) -----************** */
const getAllMovies = () => new Promise((resolve, reject) => {
  connect.query('SELECT * FROM Movies JOIN Directors ON  Movies.director_id = Directors.directorId', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

/** ****-----------Query No -7(Get All Movies With given Id) -----************** */
const getMovieWithGivenId = movieId => new Promise((resolve, reject) => {
  connect.query(`SELECT *FROM Movies WHERE movie_id=${movieId}`, (err, data) => {
    if (err) {
      reject(data);
    } else {
      resolve((data));
    }
  });
});


/** ****-----------Query No -8(Add a new movie) -----************** */
const addNewMovie = newMovie => new Promise((resolve, reject) => {
  connect.query('INSERT INTO Movies SET ?', newMovie, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve((result));
    }
  });
});

/* -----------*******Query no -9  Update The Table With Given----******---------------*/

const updateMovieWithGivenId = (movieId, updateMovie) => new Promise((resolve, reject) => {
  connect.query(`UPDATE Movies set ? WHERE movie_id=${movieId}`, updateMovie, (err, data) => {
    if (err) {
      reject(data);
    } else {
      resolve((data));
    }
  });
});


/* -----------Query No -10 Delete The Table With Given Id *-------------------------*/

const deleteMovieWithGivenId = movieid => new Promise((resolve, reject) => {
  connect.query(`DELETE  FROM Movies WHERE movie_id=${movieid}`, (err, data) => {
    if (err) {
      reject(data);
    } else {
      resolve((data));
    }
  });
});
const updateMovie = {
  Movie_rank: 5,
  title: 'The Pursuit Of Happiness',
  description: 'A job seeker struggling with life',
  runtime: 145,
  genre: 'Drama',
  rating: 80,
  metascore: 50,
  votes: 112344,
  gross_earning_in_mil: '500.5',
  director_id: 5,
  actor: 'Will Smith',
  year: 2012,
};

const newMovie = {
  Movie_rank: 10,
  title: 'Masaan',
  description: 'Deep Meaning of Life Based Movie',
  runtime: 120,
  genre: 'Drama',
  rating: 90,
  metascore: 50,
  votes: 112400,
  gross_earning_in_mil: '340.8',
  director_id: 2,
  actor: 'VickyKaushal',
  year: 2015,
};
module.exports = {
  getAllMovies, getMovieWithGivenId, addNewMovie, updateMovieWithGivenId, deleteMovieWithGivenId,
};
