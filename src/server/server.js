import express from 'express'
import request from 'request'
import mongoose from 'mongoose'

import utils from '../utils'

var app = express()

mongoose.connect('mongodb://localhost/data');

import TriFacilityModel from './models/tri-facility.js'

TriFacilityModel.createMapping(function(err, mapping) {
  if (err) {
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
  }
});

var stream = TriFacilityModel.synchronize(),
    count = 0;

stream.on('data', function(err, doc) {
    count++;
});
stream.on('close', function() {
    console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err) {
    console.log(err);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/tri_facility/search/:term', (req, res) => {
  if (utils.searchingState(req.params.term)){
    TriFacilityModel.find({
    	STATE_ABBR: utils.getStateAbbr(req.params.term)
  	},(err, threads)=>{
  	   res.send(threads)
  	})
  }

  else {
    TriFacilityModel.search({
      query_string: {
        query: req.params.term
      }
    },(err, threads) => {
      // TODO make this not break if u get nothing back
      console.log(threads)

      if (threads.hits.hits.length > 0 &&
          threads.hits.hits[0]._source){
        TriFacilityModel.find({
        	FACILITY_NAME: threads.hits.hits[0]._source["FACILITY_NAME"]
      	},(err, threads)=>{
      	   res.send(threads)
      	})
      }
    })
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
