import mongoose, {Schema} from 'mongoose'

// Comes from V_GHG_EMITTER_SECTOR
const greenhouseGasEmissionSchema = new Schema({
  "FACILITY_ID" : {
    type: String,
    index: true
  },
  //"FACILITY_NAME": String,
  //"ADDRESS1": String,
  //"ADDRESS2": String,
  //"CITY": String,
  //"STATE": String,
  //"STATE_NAME": String,
  //"ZIP": String,
  //"COUNTY_FIPS": Schema.Types.Mixed,
  //"COUNTY": String,
  //"LATITUDE": Schema.Types.Mixed,
  //"LONGITUDE": Schema.Types.Mixed,
  //"YEAR": Schema.Types.Mixed,
  "SECTOR_NAME": String,
  //"SECTOR_TYPE": String,
  //"SUBSECTOR_NAME": String,
  //"SUBSECTOR_DESC": String,
  "CO2E_EMISSION": Schema.Types.Mixed,
  "GAS_CODE": String,
  //"GAS_NAME": String,
})

module.exports = mongoose.model(
  'GREENHOUSE_GAS_EMISSION',
   greenhouseGasEmissionSchema
 );
