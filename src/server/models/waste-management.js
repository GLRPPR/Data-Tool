import mongoose, {Schema} from 'mongoose'

// Comes from V_TRI_FORM_R_WASTE_EXT_EZ
const wasteManagementSchema = new Schema({
  "TRI_FACILITY_ID" : {
    type: String,
    index: true
  },
  //"FACILITY_NAME" : String,
  //"STREET_ADDRESS" : String,
  //"CITY_NAME" : String,
  //"COUNTY_NAME" : String,
  //"STATE_ABBR" : String,
  //"REGION" : Schema.Types.Mixed,
  //"ZIP_CODE" : Schema.Types.Mixed,
  //"PRIMARY_SIC_CODE": Schema.Types.Mixed,
  //"SIC_CODES": Schema.Types.Mixed,
  //"PRIMARY_NAICS_CODE": Schema.Types.Mixed,
  //"NAICS_CODE": Schema.Types.Mixed,
  //"INDUSTRY_CODE": Schema.Types.Mixed,
  //"DOC_CTRL_NUM": Schema.Types.Mixed,
  //"CHEM_NAME": String,
  //"TRI_CHEM_ID": Schema.Types.Mixed,
  "REPORTING_YEAR": Schema.Types.Mixed,
  "RECYC_ONSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "RECYC_OFFSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "ENERGY_ONSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "ENERGY_OFFSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "TREATED_ONSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "TREATED_OFFSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "REL_CURR_YR_QTY": Schema.Types.Mixed,
  "TOTAL_PRODUCTION_RELATED_WASTE": Schema.Types.Mixed,
  //"ONE_TIME_RELEASE_QTY": Schema.Types.Mixed,
  //"SRS_ID": Schema.Types.Mixed,
})

module.exports = mongoose.model(
  'WASTE_MANAGEMENT',
   wasteManagementSchema
 );
