// use process.env variables to keep private variables,
require('dotenv').config();

/**
 * Init Web Server
 */
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

var proxy = require('express-http-proxy');

app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', proxy(process.ENV.MYDEVICES_URL || 'api.iotinabox.com'));

app.post('/api/auth', (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.redirect('/?jwt=token');
})

if (process.env.NODE_ENV == 'production') {
    const publicDir = path.resolve(__dirname + '/build');
    // static folder
    app.use(express.static(publicDir));

    // handle React
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(publicDir + '/index.html'));
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    console.log(err);
    err.status = 404;
    next(err);
});

// catch 5xx errors
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('Something broke!')
  next();
});

app.listen(port, () => console.log(`App listening on port ${port}!`));