import express from 'express'
import request from 'request'
import mongoose from 'mongoose'

var app = express()

mongoose.connect('mongodb://localhost/data');

import TriFacilityModel from './models/tri-facility.js'

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*
  This is the deprecated proxy Code

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
*/


// Get TRI_FACILITY by state
app.get('/tri_facility/state/:state', (req, res) => {
  TriFacilityModel.find({
    STATE_ABBR: req.params.state
  },(err, threads) => {
    res.send(threads)
  })
})

// get tri_facility by FACILITY_NAME
app.get('/tri_facility/facilityname/:facilityname',(req,res)=>{
TriFacilityModel.find({
	FACILITY_NAME: req.params.facilityname
	},(err, threads)=>{
	res.send(threads)
	})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
