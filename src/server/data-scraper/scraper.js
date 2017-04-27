import request from 'requestretry'
import extend from 'xtend'
import mongoose from 'mongoose'
import async from 'async'

import api from '../../api'
import TriFacilityModel from '../models/tri-facility.js'
import VTriFormRBREzModel from '../models/v-tri-form-r-br-ez.js'
import VTriFormRWasteExtEzModel from '../models/v-tri-form-r-waste-ext-ez.js'


function getUrl(beg, end, state, table){
  return `https://iaspub.epa.gov/enviro/efservice/${table}/state_abbr/${state}/rows/${beg}:${end}/JSON`
}

mongoose.connect('mongodb://localhost/datastore', function(err) {
  if (err) throw err;

  let statesToParse = ["IL", "IN", "MI", "MN", "OH", "WI"]

  // This code should be refactored it is kinda messy as is
  let TriFacilityQueue = async.queue(function (task, done) {
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
        const query = {
          TRI_FACILITY_ID: item.TRI_FACILITY_ID
        }
        const update = {
          ...item
        }
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        TriFacilityModel.findOneAndUpdate(query, update, options, (err, doc) => {
          console.log(`Successfully Added/modified doc ${query.TRI_FACILITY_ID}`)
        })
      },
      (err) => {
        if (err){
          console.log(`Error: ${err}`)
        }
      })
      done()
    });
  }, 1);



  /*
  let VTriFormRBREzQueue = async.queue(function (task, done) {
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
        VTriFormRBREzModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`Error: ${err}`)
        }
      })
      done()
    });
  }, 1);

  let VTriFormRWasteExtEzQueue = async.queue(function (task, done) {
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
        VTriFormRWasteExtEzModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`Error: ${err}`)
        }
      })
      done()
    });
  }, 1);
  */

    for (var state = 0; state < statesToParse.length; state++) {
      for (var i = 0; i < 10000; i+= 101) {
        TriFacilityQueue.push({
          url: getUrl(i,i+100,statesToParse[state], "TRI_FACILITY")
        })
        // Search 1
        TriFacilityQueue.push({
          url: getUrl(i,i+100,statesToParse[state], "V_TRI_FORM_R_BR_EZ")
        })
        // Search 4
        TriFacilityQueue.push({
          url: getUrl(i,i+100,statesToParse[state], "V_TRI_FORM_R_WASTE_EXT_EZ")
        })
      }
    }
});
