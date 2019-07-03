const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan')

const movies = require('./routes/movies')
const directors = require('./routes/directors')

const winston = require('winston');
const expressWinston = require('express-winston');


app.use(expressWinston.logger({
    transports: [        
        new winston.transports.File({ filename: 'logging/combine.log'}),        
      ],
    format: winston.format.combine(        
        winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));

app.use(morgan('dev'));


app.use('/api/movies', movies);
app.use('/api/directors', directors);

app.use(expressWinston.errorLogger({
    transports: [        
        new winston.transports.File({ filename: 'logging/error.log'}),        
      ],
    format: winston.format.combine(      
      winston.format.json()
    )
  }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}....`));
