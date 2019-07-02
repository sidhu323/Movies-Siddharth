const express = require('express');
const validate=require('../models/validate')
const router = express.Router();
const joi = require('@hapi/joi');

const directorModuleApi = require('../models/director');



/*= -------To manage the entire collection of directors resource----*/

router.get('/', (req, res,next) => {
  let err =  new Error("heavy");
  err.statusCode = 403;
  next(err);  
  directorModuleApi.getAllDirectors()
    .then(val => res.send(val))
    .catch(console.error);
});


// POST : to add a new director

router.post('/', (req, res) => {

  // console.log(req.body);
  directorModuleApi.addNewDirector(req.body)
    .then((data) => {
      res.send(data)
    });
});

/* -------To manage a single director resource-----*/

// GET : to retrieve a director
router.get('/:directorId', (req, res) => {
  directorModuleApi.getDirectorWithGivenId(req.params.directorId)
  .then((presence)=>{
    if(presence.length===0){
      return res.status(404).send("Item Not Found");
    }
  })
  .catch(console.error);
  directorModuleApi.getDirectorWithGivenId(req.params.directorId)
  .then(item=>res.send(item))
  .catch(console.error);
});

// PUT : to update details of a director
router.put('/:directorId', (req, res) => {
  directorModuleApi.getDirectorWithGivenId(req.params.directorId).then((presence) => {
    if (presence.length === 0) {
      return res.status(404).send('Item not found');
    }
  }).catch(console.error);

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
router.delete('/:directorId', (req, res) => {
  directorModuleApi.getDirectorWithGivenId(req.params.directorId).then((presence) => {
    if (presence.length === 0) {
      return res.status(404).send('Item not found');
    }
  }).catch(console.error);

  directorModuleApi.deleteDirectorWithGivenid(req.params.directorId)
    .then((data) => {
      res.send(data);
    });
});

module.exports = router;

