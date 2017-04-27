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
  "COUNTY_NAME" : {
    type: String,
    es_indexed: true
  },
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
  "ASGN_PUBLIC_PHONE_EXT" : String,

  /* From search 1 */
  "PRIMARY_SIC_CODE": Schema.Types.Mixed,
  "SIC_CODES": Schema.Types.Mixed,
  "PRIMARY_NAICS_CODE": Schema.Types.Mixed,
  "NAICS_CODE": Schema.Types.Mixed,
  "INDUSTRY_CODE": Schema.Types.Mixed,
  "DOC_CTRL_NUM": Schema.Types.Mixed,
  "CHEM_NAME": String,
  "TRI_CHEM_ID": Schema.Types.Mixed,
  "REPORTING_YEAR": Schema.Types.Mixed,
  "TOTAL_ON_SITE_RELEASE": Schema.Types.Mixed,
  "AIR_TOTAL_RELEASE": Schema.Types.Mixed,
  "WATER_TOTAL_RELEASE": Schema.Types.Mixed,
  "LAND_TOTAL_RELEASE": Schema.Types.Mixed,
  "UNINJ_TOTAL_RELEASE": Schema.Types.Mixed,
  "TOTAL_OFF_SITE_RELEASE": Schema.Types.Mixed,
  "TOTAL_ON_OFF_SITE_RELEASE": Schema.Types.Mixed,
  "SRS_ID": Schema.Types.Mixed,

  /* From Search 4 */
  "RECYC_ONSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "RECYC_OFFSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "ENERGY_ONSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "ENERGY_OFFSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "TREATED_ONSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "TREATED_OFFSITE_CURR_YR_QTY": Schema.Types.Mixed,
  "REL_CURR_YR_QTY": Schema.Types.Mixed,
  "TOTAL_PRODUCTION_RELATED_WASTE": Schema.Types.Mixed,
  "ONE_TIME_RELEASE_QTY": Schema.Types.Mixed,
})

/* prior model
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
  "COUNTY_NAME" : {
    type: String,
    es_indexed: true
  },
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
*/

triFacilitySchema.plugin(mongoosastic)

module.exports = mongoose.model('TRI_FACILITY', triFacilitySchema);
