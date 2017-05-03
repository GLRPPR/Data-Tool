import request from 'requestretry'
import extend from 'xtend'
import mongoose from 'mongoose'
import async from 'async'

import api from '../../api'

// Import models
import TriFacilityModel from '../models/tri-facility.js'
import ChemicalReleaseModel from '../models/chemical-release.js'
import GreenhouseGasEmissionModel from '../models/greenhouse-gas-emission.js'
import PollutionPreventionMethodModel from '../models/pollution-prevention-method.js'
import PollutionPreventionQuantitiesModel from '../models/pollution-prevention-quantities.js'
import WasteManagementModel from '../models/waste-management.js'

function getUrl(beg, end, state, table){
  return `https://iaspub.epa.gov/enviro/efservice/${table}/state_abbr/${state}/rows/${beg}:${end}/JSON`
}

function retryStrategy(error, response) {
  return response && 400 <= response.statusCode && response.statusCode < 600;
}

mongoose.connect('mongodb://localhost/glrppr', function(err) {
  if (err) throw err;

  let statesToParse = ["IL", "IN", "MI", "MN", "OH", "WI"]

  let TriFacilityQueue = async.queue(function (task, done) {
    console.log(`Retrieving Entries for ${task.url}`)
    request({
      url: task.url,
      json: true,
      maxAttempts: 50,
      retryDelay: 10000,
      retryStrategy
    }, (err, res, body) => {
      if (err) {console.log(`Error:${err}`)}
      async.each(body,
      (item, cb) => {
        item["_id"] = item.TRI_FACILITY_ID
        TriFacilityModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`TRI_FACILITY: ${err}`)
        }
      })
      done()
    });
  }, 1);

  let ChemicalReleaseQueue = async.queue(function (task, done) {
    console.log(`Retrieving Entries for ${task.url}`)
    request({
      url: task.url,
      json: true,
      maxAttempts: 50,
      retryDelay: 10000,
      retryStrategy
    }, (err, res, body) => {
      if (err) {console.log(`Error:${err}`)}
      async.each(body,
      (item, cb) => {
        ChemicalReleaseModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`CHEMICAL_RELEASE: ${err}`)
        }
      })
      done()
    });
  }, 1);

  let GreenhouseGasEmissionQueue = async.queue(function (task, done) {
    console.log(`Retrieving Entries for ${task.url}`)
    request({
      url: task.url,
      json: true,
      maxAttempts: 50,
      retryDelay: 10000,
      retryStrategy
    }, (err, res, body) => {
      if (err) {console.log(`Error:${err}`)}
      async.each(body,
      (item, cb) => {
        GreenhouseGasEmissionModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`GREENHOUSE_GAS_EMISSION: ${err}`)
        }
      })
      done()
    });
  }, 1);

  let PollutionPreventionMethodQueue = async.queue(function (task, done) {
    console.log(`Retrieving Entries for ${task.url}`)
    request({
      url: task.url,
      json: true,
      maxAttempts: 50,
      retryDelay: 10000,
      retryStrategy
    }, (err, res, body) => {
      if (err) {console.log(`Error:${err}`)}
      async.each(body,
      (item, cb) => {
        PollutionPreventionMethodModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`POLLUTION_PREVENTION_METHOD: ${err}`)
        }
      })
      done()
    });
  }, 1);

  let PollutionPreventionQuantitiesQueue = async.queue(function (task, done) {
    console.log(`Retrieving Entries for ${task.url}`)
    request({
      url: task.url,
      json: true,
      maxAttempts: 50,
      retryDelay: 10000,
      retryStrategy
    }, (err, res, body) => {
      if (err) {console.log(`Error:${err}`)}
      async.each(body,
      (item, cb) => {
        PollutionPreventionQuantitiesModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`POLLUTION_PREVENTIONS_QUANTITY: ${err}`)
        }
      })
      done()
    });
  }, 1);

  let WasteManagementQueue = async.queue(function (task, done) {
    console.log(`Retrieving Entries for ${task.url}`)
    request({
      url: task.url,
      json: true,
      maxAttempts: 50,
      retryDelay: 10000,
      retryStrategy
    }, (err, res, body) => {
      if (err) {console.log(`Error:${err}`)}
      async.each(body,
      (item, cb) => {
        WasteManagementModel.create(item, cb);
      },
      (err) => {
        if (err){
          console.log(`WASTE MANAGMENT: ${err}`)
        }
      })
      done()
    });
  }, 1);



    for (var state = 0; state < statesToParse.length; state++) {
      for (var i = 0; i < 10000; i+= 101) {
        let start = i,
            end = i+100,
            stateInitial = statesToParse[state]

        TriFacilityQueue.push({
          url: getUrl(start, end, stateInitial, "TRI_FACILITY")
        })
        ChemicalReleaseQueue.push({
          url: getUrl(start, end, stateInitial, "V_TRI_FORM_R_BR_EZ")
        })
        GreenhouseGasEmissionQueue.push({
          url: getUrl(start, end, stateInitial, "V_GHG_EMITTER_SECTOR")
        })
        PollutionPreventionMethodQueue.push({
          url: getUrl(start, end, stateInitial, "V_TRI_SOURCE_REDUCT_METHOD")
        })
        PollutionPreventionQuantitiesQueue.push({
          url: getUrl(start, end, stateInitial, "V_TRI_SOURCE_REDUCT_QTY")
        })
        WasteManagementQueue.push({
          url: getUrl(start, end, stateInitial, "V_TRI_FORM_R_WASTE_EXT_EZ")
        })
      }
    }
});
