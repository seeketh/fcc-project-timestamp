// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let isUnix = (inputDate) => {

  return (/^\d{1,13}$/).test(inputDate);
}

// Time-stamp endpoint
app.get("/api/:ts", function (req, res) {

  let dateObj = null;

  if (isUnix(req.params.ts)) {
    const ts = new Date(Number.parseInt(req.params.ts));
    dateObj = {
      unix: req.params.ts,
      uct: ts.toString()
    }
  } else {
    const ts = new Date(req.params.ts);
    let unix = ts.getTime();
    if (isNaN(unix)) {
      dateObj = {
        error: ts.toString()
      }
    } else {
      dateObj = {
        unix,
        uct: ts.toString()
      }
    }
  }

  res.json(dateObj);

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
