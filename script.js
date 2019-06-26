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
    director_id VARCHAR(50), 
    actor VARCHAR(21) ,
    year INT(4),
    PRIMARY KEY (Movie_rank) )`;

const Director_table = `CREATE TABLE Director(
   Director_id INT(3),
   director_name VARCHAR(250),
   FOREIGN KEY (Director_id) REFERENCES movies(Movie_rank))`;


connection.query(Movie_table, (err, result) => {
  if (err) throw err;
  console.log(' Movie Table created');
});
connection.query(Director_table, (err, result) => {
  if (err) throw err;
  console.log(' Director Table created');
});
// const Remove_Director_Entries = Movie_data.map(({ Director, ...l }) => l);
// console.log(Remove_Director_Entries);
const Final_Data_FOR_Movie = Movie_data.map(Object.values);
// console.log(Final_Data_FOR_Movie);
connection.query('insert into movies VALUES ?', [Final_Data_FOR_Movie]);

let id = 1;
let directors = new Set();
Movie_data.forEach((item) => {
  directors.add(item.Director);
});

let obj = {};
directors.forEach((director) => {
  if (!obj.hasOwnProperty(director)) {
    obj[director] = id;
    id += 1;
  }
});
// console.log(obj);

let Director_unique_table= Object.keys(obj).reduce((acc, cur) => {
  acc.push({
    director_name: cur,
    Director_id: obj[cur],
  });
  return acc;
}, []);


Director_unique_table.forEach((item) => {
  connection.query('insert into Director set ?', item, (error) => {
    if (error) throw error;
  });
});

const modify = `UPDATE movies join  Director on Director.director_name = movies.director_id 
                set movies.director_id = Director.Director_id`;
connection.query(modify, (error) => {
  if (error) throw error;
});
connection.end();
