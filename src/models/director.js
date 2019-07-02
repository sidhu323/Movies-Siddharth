const db = require('../utils/connectDb');

const connect = db.connectDatabase();


/** ****-----------Query No -1 -----************** */
const getAllDirectors = () => new Promise((resolve, reject) => {
  connect.query('SELECT * FROM Directors;', (err, data) => {
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
const addNewDirector = (newdirector) => new Promise((resolve, reject) => {
  const insert = 'INSERT INTO Directors SET ?';
  connect.query(insert, newdirector, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

/** ****-----------Query No -4(Update Director With GIven ID) -----************** */
const updateDirectorWithGivenId = (id, name) => new Promise((resolve, reject) => {
  connect.query(`UPDATE Directors SET ? WHERE directorId = ${id}`, name, (err, data) => {
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
module.exports = {
  getAllDirectors,
  getDirectorWithGivenId,
  addNewDirector,
  updateDirectorWithGivenId,
  deleteDirectorWithGivenid,
};
