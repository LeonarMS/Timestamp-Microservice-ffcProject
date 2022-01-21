// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


// your first API endpoint.. 
app.get("/api/:date", function (req, res) {
  let inputDate = req.params.date;
  let isNum = /^\d+$|^-\d+$/.test(inputDate);
  let date, unix;
  if(!isNum) {
    unix = Date.parse(inputDate);
    date = new Date(unix).toUTCString();
  } else {
    unix = parseInt(inputDate);
    date = new Date(unix).toUTCString();
  }
  if(unix) {
    res.json({unix: unix, utc: date});
  } else {
    res.json({error: date});
  } 
});
app.get('/api/', (req, res) => {
  let date = new Date().toUTCString(),
  unix = Date.parse(date);
  res.json({unix: unix, utc: date});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
