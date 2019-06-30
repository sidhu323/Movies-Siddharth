/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
const express = require('express');
const db = require('../utils/connectDb');

const connect = db.connectDatabase();
const Movie_data = require('../../src/movies.json');


connect.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
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
  return Promise.all(Movie_data.map(data => new Promise((resolve, reject) => {
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
  })));
}
function makeDirectorTable() {
  const sql = 'CREATE TABLE Directors(directorId int AUTO_INCREMENT Primary key, Name varchar(200))';
  const create = new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log('director-table-created');
        resolve();
      }
    });
  });
  return create;
}
function insertDirectorvalue(distinctDirectorName) {
  return Promise.all(distinctDirectorName.map(item => new Promise((resolve, reject) => {
    connect.query(`insert into Directors (Name) VALUES ("${item}")`, (err, res) => {
      // console.log('inserting director', item);
      if (err) {
        reject(err);
      } else {
        resolve((res));
      }
    });
  })));
}
const Distinctvalue = Movie_data.map(item => item.Director);
const distinctDirectorName = [...new Set(Distinctvalue)];

async function main() {
  // await connection();
  await DropTable();
  await makeDirectorTable();
  await makeMovieTable();
  await insertDirectorvalue(distinctDirectorName);
  await insertMovies(Movie_data);
  connect.end();
}

main();
