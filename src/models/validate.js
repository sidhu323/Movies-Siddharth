const Joi=require('@hapi/joi')

function directorValidator(directorbodyObject){
    const directorSchema={
        Name:Joi.string().min(1).required()
    }
    return Joi.validate(directorbodyObject, directorSchema)
}

function directorValidatorUpdate(directorbodyObject){
    const directorSchema={
        Name:Joi.string().min(1)
    }
    return Joi.validate(directorbodyObject, directorSchema)
}

function ValidatorForMoviesUpdate(movieBodyObject){
    const movieSchema = {
        Movie_rank: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        runtime: Joi.number(),
        genre: Joi.string(),
        rating: Joi.number(),
        metascore: Joi.string(),
        votes: Joi.number(),
        gross_earning_in_mil: Joi.string(),
        director_id: Joi.number(),
        actor: Joi.string(),
        year: Joi.number(),
       };
     return Joi.validate(movieBodyObject,movieSchema)
}


function ValidatorForMovies(movieBodyObject){
    const movieSchema = {
        Movie_rank: Joi.number().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        runtime: Joi.number().required(),
        genre: Joi.string().required(),
        rating: Joi.number().required(),
        metascore: Joi.string().required(),
        votes: Joi.number().required(),
        gross_earning_in_mil: Joi.string().required(),
        director_id: Joi.number().required(),
        actor: Joi.string().required(),
        year: Joi.number().required(),
       };
     return Joi.validate(movieBodyObject,movieSchema)
}

module.exports = {directorValidator ,directorValidatorUpdate,ValidatorForMovies,ValidatorForMoviesUpdate}