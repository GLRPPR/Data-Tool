import express from 'express'
import request from 'request'
import mongoose from 'mongoose'

import utils from '../utils'

var app = express()

mongoose.connect('mongodb://localhost/glrppr');

import TriFacilityModel from './models/tri-facility.js'
import ChemicalReleaseModel from './models/chemical-release.js'
import GreenhouseGasEmissionModel from './models/greenhouse-gas-emission.js'
import PollutionPreventionMethodModel from './models/pollution-prevention-method.js'
import PollutionPreventionQuantitiesModel from './models/pollution-prevention-quantities.js'
import WasteManagementModel from './models/waste-management.js'
import ghg2frsModel from './models/ghg2frs.js'
import frs2triModel from './models/frs2tri.js'

// Add the indexes to elastic search currently only searching on models
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

function getChemicalReleasesByTriId(id, cb){
  ChemicalReleaseModel.find({
    "TRI_FACILITY_ID": id
  }, (err, releases) => {
   cb(releases)
  })
}

function logError(err) { console.error('Error: ', err) }

function fetchAllFacilityData(facility, res) {
  let modifiedFacility = facility
  ChemicalReleaseModel.find({"TRI_FACILITY_ID": facility.TRI_FACILITY_ID})
  .catch(err => {logError(err);return})
  .then(releases => {
    modifiedFacility.CHEMICAL_RELEASES = releases
    return
  })
  .then(x => {
    return WasteManagementModel.find({"TRI_FACILITY_ID": facility.TRI_FACILITY_ID})
    .catch(err => {logError(err);return})
    .then(wms => {
      modifiedFacility.WASTE_MANAGEMENTS = wms
      return
    })
  })
  .then(x => {
    return PollutionPreventionMethodModel.find({"TRI_FACILITY_ID": facility.TRI_FACILITY_ID})
    .catch(err => {logError(err);return})
    .then(ppm => {
      modifiedFacility.POLLUTION_PREVENTION_METHODS = ppm
      return
    })
  })
  .then(x => {
    return PollutionPreventionQuantitiesModel.find({"TRI_FACILITY_ID": facility.TRI_FACILITY_ID})
    .catch(err => {logError(err);return})
    .then(ppq => {
      modifiedFacility.POLLUTION_PREVENTIONS_QUANTITIES = ppq
      return
    })
  })
  .then(x => {
    return frs2triModel.find({"TRI_FACILITY_ID": facility.TRI_FACILITY_ID})
    .catch(err => {logError(err);return})
    .then(frsTriMapper => {
      if (frsTriMapper.length == 0){
        return null
      }
      return frsTriMapper
    })
  })
  .then(frsTriMapper => {
    if(frsTriMapper == null){
      return
    }
    return ghg2frsModel.find({"FRS_ID": frsTriMapper[0].FRS_ID})
    .catch(err => {logError(err);return})
    .then(ghgFrsMapper => {
      if (ghgFrsMapper.length == 0){
        return null
      }
      return ghgFrsMapper
    })
  })
  .then(ghgFrsMapper => {
    if(ghgFrsMapper == null){
      return
    }
    return GreenhouseGasEmissionModel.find({"FACILITY_ID": ghgFrsMapper[0].FRS_ID})
    .catch(err => {logError(err);return})
    .then(ghgs => {
      modifiedFacility.GREENHOUSE_GAS_EMISSIONS = ghgs
      return
    })
  })
  .then(x => {
    res.send(modifiedFacility)
  })
}

app.get('/tri_facility/detailed/:id', (req, res) => {
  // We should probably do this using the populate but I couldn't get it to work
  TriFacilityModel.findOne({
    "TRI_FACILITY_ID": req.params.id
  }, (err, facility) => {
    if(facility && facility.TRI_FACILITY_ID) {
      fetchAllFacilityData(facility, res)
    }
    else {
      res.send([])
    }
  })
})

// Todo move routes outside of one file once they get a little more complex.

// TODO: This endpoint should maybe return populated info
app.get('/tri_facility/search/:term', (req, res) => {
  /* If one is searching for a state */
  if (utils.searchingState(req.params.term)){
    TriFacilityModel.find({
    	STATE_ABBR: utils.getStateAbbr(req.params.term)
  	},(err, facilities)=>{
       facilities.map()
  	   res.send(facilities)
  	})
  }

  else {
    TriFacilityModel.search({
      query_string: {
        query: req.params.term
      }
    },(err, threads) => {
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
