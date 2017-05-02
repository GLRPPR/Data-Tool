import mongoose, {Schema} from 'mongoose'

// Comes from table V_TRI_FORM_R_BR_EZ
const chemicalReleaseSchema = new Schema({
  "TRI_FACILITY_ID" : {
    type: String,
    index: true
  },
  //"FACILITY_NAME" : String,
  //"STREET_ADDRESS" : String,
  //"CITY_NAME" : String,
  //"COUNTY_NAME" : String,
  //"STATE_ABBR" : String,
  //"ZIP_CODE" : Schema.Types.Mixed,
  //"PRIMARY_SIC_CODE": Schema.Types.Mixed,
  //"SIC_CODES": Schema.Types.Mixed,
  "PRIMARY_NAICS_CODE": Schema.Types.Mixed,
  //"NAICS_CODE": Schema.Types.Mixed,
  "INDUSTRY_CODE": Schema.Types.Mixed,
  //"DOC_CTRL_NUM": Schema.Types.Mixed,
  "CHEM_NAME": String,
  //"TRI_CHEM_ID": Schema.Types.Mixed,
  "REPORTING_YEAR": Schema.Types.Mixed,
  //"TOTAL_ON_SITE_RELEASE": Schema.Types.Mixed,
  //"AIR_TOTAL_RELEASE": Schema.Types.Mixed,
  //"WATER_TOTAL_RELEASE": Schema.Types.Mixed,
  //"LAND_TOTAL_RELEASE": Schema.Types.Mixed,
  //"UNINJ_TOTAL_RELEASE": Schema.Types.Mixed,
  //"TOTAL_OFF_SITE_RELEASE": Schema.Types.Mixed,
  "TOTAL_ON_OFF_SITE_RELEASE": Schema.Types.Mixed,
  //"SRS_ID": Schema.Types.Mixed
})

module.exports = mongoose.model(
  'CHEMICAL_RELEASE',
   chemicalReleaseSchema
 );
