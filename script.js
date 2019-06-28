/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
const express = require('express');
const mysql = require('mysql');

const app = express();
const Movie_data = require('./movies.json');

const connect = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'owOKux9BCI',
  password: 'Tu1PPJHfon',
  database: 'owOKux9BCI',
});

function connection() {
  return connect.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
}


const DropTable = () => new Promise((resolve, reject) => {
  connect.query('DROP table if exists Movies,Directors', (error, result) => {
    if (error) reject(error);
    else resolve(console.log('Dropped the Table'));
  });
});

const makeMovieTable = () => new Promise((resolve, reject) => {
  const Movie_table = `CREATE TABLE Movies(  
          movie_id INT(3) PRIMARY KEY AUTO_INCREMENT ,
          Movie_rank INT(5),
          title VARCHAR(50),
          description VARCHAR(254) ,
          runtime INT (10) ,
          genre VARCHAR(20),
          rating FLOAT ,
          metascore VARCHAR(50),
          votes INT(20) ,
          gross_earning_in_mil VARCHAR(50) ,
          director_id INT, 
          actor VARCHAR(50) ,
          year INT(4),
          FOREIGN KEY (director_id) REFERENCES Directors(directorId)
       )`;
  connect.query(Movie_table, (err, result) => {
    if (err) reject(console.log(err));
    resolve(console.log('Movie Table Created'));
  });
});

function getDirectorId(name) {
  return new Promise((resolve, reject) => {
    connect.query(`SELECT * FROM Directors WHERE Name = "${name}" `, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve((data[0].directorId));
      }
    });
  });
}

function insertMovies(Movie_data) {
  return new Promise((resolve, reject) => {
    Movie_data.forEach((data) => {
      // console.log(data);
      const fetchIdOfDirector = getDirectorId(data.Director);
      fetchIdOfDirector.then((ID) => {
        connect.query(`INSERT INTO Movies(Movie_rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_id, actor, year) 
        VALUES(${data.Rank}, "${data.Title}", "${data.Description}", ${data.Runtime}, "${data.Genre}",
         ${data.Rating}, "${data.Metascore}", ${data.Votes}, "${data.Gross_Earning_in_Mil}", ${ID}, 
         "${data.Actor}", ${data.Year})`, (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
    });
  });
}
function makeDirectorTable() {
  const sql = 'CREATE TABLE Directors(directorId int AUTO_INCREMENT Primary key, Name varchar(200))';
  const create = new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log('director-table-created'));
      }
    });
  });
  return create;
}
// eslint-disable-next-line max-len
// Here we are inserting Unique director Name (IN distinctDirectorName we have used set for unique name)
function insertDirectorvalue(distinctDirectorName) {
  return new Promise((resolve, reject) => {
    distinctDirectorName.forEach((item) => {
      connect.query(`insert into Directors (Name) VALUES ("${item}")`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve((res));
        }
      });
    });
  });
}
const Distinctvalue = Movie_data.map(item => item.Director);
const distinctDirectorName = [...new Set(Distinctvalue)];
/** ****-----------Query No -1 -----************** */
const getAllDirectors = () => new Promise((resolve, reject) => {
  connect.query('SELECT Name FROM Directors;', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve((data));
    }
  });
});
/** ****-----------Query No -2 Get the director with given ID -----************** */
const getDirectorWithGivenId = id => new Promise((resolve, reject) => {
  connect.query(`SELECT Name FROM Directors WHERE directorId = '${id}';`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve((data));
    }
  });
});

/** ****-----------Query No -3(Add A New Director) -----************** */
const addNewDirector = newdirector => new Promise((resolve, reject) => {
  connect.query(`INSERT INTO Directors(Name)
             VALUES("${newdirector}")`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve((data));
    }
  });
});

/** ****-----------Query No -4(Update Director With GIven ID) -----************** */
const updateDirectorWithGivenId = (id, name) => new Promise((resolve, reject) => {
  connect.query(`UPDATE Directors
             SET Name = "${name}"
             WHERE directorId = ${id}`, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

/** ****-----------Query No -5(Delete Director With GIven ID) -----************** */
const deleteDirectorWithGivenid = id => new Promise((resolve, reject) => {
  connect.query(`DELETE FROM Directors  WHERE directorId="${id}"`, (err, data) => {
    if (err) {
      reject(data);
    } else {
      resolve(data);
    }
  });
});

/** ****-----------Query No -6(Get All Movies) -----************** */
const getAllMovies = () => new Promise((resolve, reject) => {
  connect.query('SELECT * FROM Movies', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});


/** ****-----------Query No -7(Get All Movies) -----************** */
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

// eslint-disable-next-line max-len
const addNewMovie = (Movie_rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_id, actor, year) => new Promise((resolve, reject) => {
  // connect.query(`INSERT INTO Movies(Movie_rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_id, actor, year)
  // VALUES(${Movie_rank}, "${title}", "${description}", ${runtime}, "${genre}",
  //  ${rating}, "${metascore}", ${votes}, "${gross_earning_in_mil}", ${director_id},
  //  "${actor}", ${year})`, (err, res) => {
  //   if (err) {
  //     reject(err);
  //   }
  //   resolve(res);
  // });

  const addData = {
    Movie_rank,
    title,
    description,
    runtime,
    genre,
    rating,
    metascore,
    votes,
    gross_earning_in_mil,
    director_id,
    actor,
    year,
  };
  const query = connect.query('INSERT INTO Movies SET ?', addData, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve((result));
    }
  });
});

/* -----------*******Query no -9  Update The Table With Given Id ----******---------------*/

const updateMovieWithGivenId = (movieId, Movie_rank, title) => new Promise((resolve, reject) => {
  connect.query(`UPDATE Movies set Movie_rank=${Movie_rank},title="${title}" WHERE movie_id=${movieId}`, (err, data) => {
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

async function main() {
  await connection();
  await DropTable();
  await makeDirectorTable();
  await makeMovieTable();
  await insertDirectorvalue(distinctDirectorName);
  await insertMovies(Movie_data);
  // await getAllDirectors();
  // await getDirectorWithGivenId(4);
  // await addNewDirector('sidhu');
  // await updateDirectorWithGivenId(24, 'siddharth');
  // await deleteDirectorWithGivenid(24);
  // await getAllMovies();
  // await getMovieWithGivenId(3);
  // eslint-disable-next-line max-len
  // await addNewMovie(10, 'masaan', 'Deep Meaning of Life Based Movie', 120, 'Drama', 90, 50, '112400', '340.8', 2, 'VickyKaushal', 2015);
  // await updateMovieWithGivenId(2, 3, 'The Pursuit Of Happiness');
  // await deleteMovieWithGivenId(2);
  connect.end();
}

main();
