const express = require('express');
const validate=require('../models/validate')
const app = express();
const router = express.Router();
const joi = require('@hapi/joi');

app.use(express.json());

const directorModuleApi = require('../models/director');

router.get('/error', (req, res, next) => next(new Error('This is  error')));

/*= -------To manage the entire collection of directors resource----*/

app.get('/api/directors', (req, res) => {
  directorModuleApi.getAllDirectors()
    .then(val => res.send(val));
});


// POST : to add a new director

app.post('/api/directors', (req, res) => {
  const {error}= validate.directorValidator(req.body)
  if(error){
    return res.status(400).send("error.details[0].message")
  }
  directorModuleApi.addNewDirector(req.body)
    .then((data) => {
      res.send(data);
    });
});

/* -------To manage a single director resource-----*/

// GET : to retrieve a director
app.get('/api/directors/:directorId', (req, res) => {
  directorModuleApi.getDirectorWithGivenId(req.params.directorId)
    .then((data) => {
      res.send(data);
    });
});

// PUT : to update details of a director
app.put('/api/directors/:directorId', (req, res) => {
  const {error}=validate.directorValidatorUpdate(req.body)
  if(error){
    return res.status(400).send("error.details[0].message")
  }
  directorModuleApi.updateDirectorWithGivenId(req.params.directorId, req.body)
    .then((data) => {
      res.send(data);
    });
});

// DELETE : to remove a director
app.delete('/api/directors/:directorId', (req, res) => {
  directorModuleApi.deleteDirectorWithGivenid(req.params.directorId)
    .then((data) => {
      res.send(data);
    });
});


const port = process.env.portNumber || 5000;
app.listen(port, () => {
  console.log('Node Server is running');
});


