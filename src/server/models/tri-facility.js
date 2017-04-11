import mongoose, {Schema} from 'mongoose'
import mongoosastic from 'mongoosastic'

const triFacilitySchema = new Schema({
  "TRI_FACILITY_ID" : {
    type: String,
    index: true
  },
  "FACILITY_NAME" : {
    type: String,
    es_indexed: true
  },
  "STREET_ADDRESS" : String,
  "CITY_NAME" : String,
  "COUNTY_NAME" : String,
  "STATE_COUNTY_FIPS_CODE" : Schema.Types.Mixed,
  "STATE_ABBR" : String,
  "ZIP_CODE" : Schema.Types.Mixed,
  "REGION" : Schema.Types.Mixed,
  "FAC_CLOSED_IND" : Schema.Types.Mixed,
  "MAIL_NAME" : String,
  "MAIL_STREET_ADDRESS" : String,
  "MAIL_CITY" : String,
  "MAIL_STATE_ABBR" : String,
  "MAIL_PROVINCE" : Schema.Types.Mixed,
  "MAIL_COUNTRY" : Schema.Types.Mixed,
  "MAIL_ZIP_CODE" : Schema.Types.Mixed,
  "ASGN_FEDERAL_IND" : String,
  "ASGN_AGENCY" : String,
  "FRS_ID" : String,
  "PARENT_CO_DB_NUM" : Schema.Types.Mixed,
  "PARENT_CO_NAME" : String,
  "FAC_LATITUDE" : Schema.Types.Mixed,
  "FAC_LONGITUDE" : Schema.Types.Mixed,
  "PREF_LATITUDE" : Schema.Types.Mixed,
  "PREF_LONGITUDE" : Schema.Types.Mixed,
  "PREF_ACCURACY" : Schema.Types.Mixed,
  "PREF_COLLECT_METH" : String,
  "PREF_DESC_CATEGORY" : String,
  "PREF_HORIZONTAL_DATUM" : Schema.Types.Mixed,
  "PREF_SOURCE_SCALE" : String,
  "PREF_QA_CODE" : String,
  "ASGN_PARTIAL_IND" : Schema.Types.Mixed,
  "ASGN_PUBLIC_CONTACT" : String,
  "ASGN_PUBLIC_PHONE" : Schema.Types.Mixed,
  "ASGN_PUBLIC_CONTACT_EMAIL" : String,
  "BIA_CODE" : String,
  "STANDARDIZED_PARENT_COMPANY" : String,
  "ASGN_PUBLIC_PHONE_EXT" : String
})

triFacilitySchema.plugin(mongoosastic)

module.exports = mongoose.model('TRI_FACILITY', triFacilitySchema);
