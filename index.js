var express = require('express');
var app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that the service is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

// Home page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Time-stamp endpoint
app.get("/api/:ts", function (req, res) {

  let dateObj = null;

  if ((/^\d{1,13}$/).test(req.params.ts)) {
    const ts = new Date(Number.parseInt(req.params.ts));
    dateObj = {
      unix: Number(req.params.ts),
      utc: ts.toGMTString()
    }
  } else {
    const ts = new Date(req.params.ts);
    const unix = Number(ts.getTime());
    if (isNaN(unix)) {
      dateObj = {
        error: ts.toString()
      }
    } else {
      dateObj = {
        unix,
        utc: ts.toGMTString()
      }
    }
  }

  res.json(dateObj);
});

app.get("/api", (req, res) => {
  const ts = new Date();
  dateObj = {
    unix: Number(ts.getTime()),
    utc: ts.toGMTString()
  };

  res.json(dateObj);
});

app.all("*", (req, res) => {
  res.status(404).json({
    "error": `resourse ${req.url} not found`
  });
});

app.listen(PORT, console.log(`Service listening on ${PORT}`));
