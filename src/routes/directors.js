const express = require('express');

const router = express.Router();


const directorModuleApi = require('../models/director');

router.get('/error', (req, res, next) => next(new Error('This is  error')));

