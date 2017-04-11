import request from 'requestretry'
import extend from 'xtend'
import mongoose from 'mongoose'
import async from 'async'

import api from '../../api'
import TriFacilityModel from '../models/tri-facility.js'

function getUrl(beg, end, state){
  return `https://iaspub.epa.gov/enviro/efservice/tri_facility/state_abbr/${state}/rows/${beg}:${end}/JSON`
}

mongoose.connect('mongodb://localhost/testnew', function(err) {
  if (err) throw err;

  let statesToParse = ["IL", "IN", "MI", "MN", "OH", "WI"]

  let q = async.queue(function (task, done) {
    console.log(`Retrieving Entries for ${task.url}`)
    request({
      url: task.url,
      json: true,
      maxAttempts: 50,
      retryDelay: 10000,
      retryStrategy: (err, response) => {
        return response && 400 <= response.statusCode && response.statusCode < 600;
      }
    }, (err, res, body) => {
      if (err) {console.log(`Error:${err}`)}
      async.each(body,
      (item, cb) => {
        TriFacilityModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`Error: ${err}`)
        }
      })
      done()
    });
  }, 1);

  for (var state = 0; state < statesToParse.length; state++) {
    for (var i = 0; i < 10000; i+= 101) {
      q.push({url: getUrl(i,i+100,statesToParse[state])})
    }
  }
});
