/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
const express = require('express');
const mysql = require('mysql');

const app = express();
const Movie_data = require('./movies.json');

const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'owOKux9BCI',
  password: 'Tu1PPJHfon',
  database: 'owOKux9BCI',
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
connection.query('drop table if exists Director,movies ', (err) => {
  if (err) { throw err; }
});
const Movie_table = `CREATE TABLE movies(  
    Movie_rank INT(3),
    title VARCHAR(49),
    description VARCHAR(254) ,
    runtime INT (4) ,
    genre VARCHAR(9),
    rating FLOAT(20) ,
    metascore VARCHAR(50),
    votes INT(20) ,
    gross_earning_in_mil VARCHAR(30) ,
    actor VARCHAR(21) ,
    year INT(4),
    PRIMARY KEY (Movie_rank) )`;

const Director_table = `CREATE TABLE Director(
   movie_rank_id INT(3),
   director_name VARCHAR(250),
   FOREIGN KEY (movie_rank_id) REFERENCES movies(Movie_rank))`;


connection.query(Movie_table, (err, result) => {
  if (err) throw err;
  console.log(' Movie Table created');
});
connection.query(Director_table, (err, result) => {
  if (err) throw err;
  console.log(' Director Table created');
});
const Remove_Director_Entries = Movie_data.map(({ Director, ...l }) => l);
// console.log(Remove_Director_Entries);
const Final_Data_FOR_Movie = Remove_Director_Entries.map(Object.values);
// console.log(Final_Data_FOR_Movie);
connection.query('insert into movies VALUES ?', [Final_Data_FOR_Movie]);

// eslint-disable-next-line no-undef
// eslint-disable-next-line dot-notation
const x = Movie_data.map(item => item['Director']);
const set = [...new Set(x)];
// console.log(set);
const y = set.reduce((acc, item) => {
    
});

Movie_data.forEach((element) => {
  connection.query(`insert into Director 
  VALUES(${element.Rank},"${element.Director}")`, (err) => {
    if (err) throw err;
  });
});
connection.end();
