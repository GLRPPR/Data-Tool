var express = require('express')
var request = require('request');

var app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var enviroApiUrl = "https://iaspub.epa.gov/enviro"

// Simple backend proxying service to avoid CORS issues with
// Envirofacts API
app.get('*', function (req, res) {
  var url = enviroApiUrl + req.originalUrl
  console.log(url)
  request(url, function (error, response, body) {
    res.send(body)
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
