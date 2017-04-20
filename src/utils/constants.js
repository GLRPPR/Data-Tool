export default {
  BASEMAPS: {
    "STREETS": "streets",
    "SATELLITE": "satellite",
    "HYBRID": "hybrid",
    "TOPO": "topo",
    "GRAY": "gray",
    "DARK_GRAY": "dark-gray",
    "OCEANS": "oceans",
    "NATIONAL_GEOGRAPHIC": "national-geographic",
    "TERRAIN": "terrain",
    "OSM": "osm",
    "DARK_GRAY_VECTOR": "dark-gray-vector",
    "GRAY_VECTOR": "gray-vector",
    "STREETS_VECTOR": "streets-vector",
    "TOPO_VECTOR": "topo-vector",
    "STREETS_NIGHT_VECTOR": "streets-night-vector",
    "STREETS_RELIEF_VECTOR": "streets-relief-vector",
    "STREETS_NAVIGATION_VECTOR": "streets-navigation-vector"
  },
  TRI_FIELDS: [
    "TRI_FACILITY_ID",
    "FACILITY_NAME",
    "STREET_ADDRESS",
    "CITY_NAME",
    "COUNTY_NAME",
    "STATE_ABBR",
    "ZIP_CODE"
  ],
  STATES: {
    "AK" : "Alaska",
    "AL" : "Alabama",
    "AR" : "Arkansas",
    "AS" : "American Samoa",
    "AZ" : "Arizona",
    "CA" : "California",
    "CO" : "Colorado",
    "CT" : "Connecticut",
    "DC" : "District of Columbia",
    "DE" : "Delaware",
    "FL" : "Florida",
    "GA" : "Georgia",
    "GU" : "Guam",
    "HI" : "Hawaii",
    "IA" : "Iowa",
    "ID" : "Idaho",
    "IL" : "Illinois",
    "IN" : "Indiana",
    "KS" : "Kansas",
    "KY" : "Kentucky",
    "LA" : "Louisiana",
    "MA" : "Massachusetts",
    "MD" : "Maryland",
    "ME" : "Maine",
    "MI" : "Michigan",
    "MN" : "Minnesota",
    "MO" : "Missouri",
    "MS" : "Mississippi",
    "MT" : "Montana",
    "NC" : "North Carolina",
    "ND" : "North Dakota",
    "NE" : "Nebraska",
    "NH" : "New Hampshire",
    "NJ" : "New Jersey",
    "NM" : "New Mexico",
    "NV" : "Nevada",
    "NY" : "New York",
    "OH" : "Ohio",
    "OK" : "Oklahoma",
    "OR" : "Oregon",
    "PA" : "Pennsylvania",
    "PR" : "Puerto Rico",
    "RI" : "Rhode Island",
    "SC" : "South Carolina",
    "SD" : "South Dakota",
    "TN" : "Tennessee",
    "TX" : "Texas",
    "UT" : "Utah",
    "VA" : "Virginia",
    "VI" : "Virgin Islands",
    "VT" : "Vermont",
    "WA" : "Washington",
    "WI" : "Wisconsin",
    "WV" : "West Virginia",
    "WY" : "Wyoming"
  },
  LAYER_FIELDS:[
    {
      name: "ObjectID",
      alias: "ObjectID",
      type: "oid"
    }, {
      name: "TRI_FACILITY_ID",
      type: "string"
    }, {
      name: "FACILITY_NAME",
      type: "string"
    }, {
      name: "STREET_ADDRESS",
      type: "string"
    }, {
      name: "CITY_NAME",
      type: "string"
    }, {
      name: "STATE_COUNTY_FIPS_CODE",
      type: "string"
    }, {
      name: "STATE_ABBR",
      type: "string"
    }, {
      name: "ZIP_CODE",
      type: "string"
    }, {
      name: "REGION",
      type: "string"
    }, {
      name: "FAC_CLOSED_IND",
      type: "string"
    }, {
      name: "MAIL_NAME",
      type: "string"
    }, {
      name: "MAIL_STREET_ADDRESS",
      type: "string"
    }, {
      name: "MAIL_CITY",
      type: "string"
    }, {
      name: "MAIL_STATE_ABBR",
      type: "string"
    }, {
      name: "MAIL_PROVINCE",
      type: "string"
    }, {
      name: "MAIL_COUNTRY",
      type: "string"
    }, {
      name: "MAIL_ZIP_CODE",
      type: "string"
    }, {
      name: "ASGN_FEDERAL_IND",
      type: "string"
    }, {
      name: "ASGN_AGENCY",
      type: "string"
    }, {
      name: "FRS_ID",
      type: "string"
    }, {
      name: "PARENT_CO_DB_NUM",
      type: "string"
    }, {
      name: "PARENT_CO_NAME",
      type: "string"
    }, {
      name: "FAC_LATITUDE",
      type: "string"
    }, {
      name: "FAC_LONGITUDE",
      type: "string"
    }, {
      name: "PREF_LATITUDE",
      type: "string"
    }, {
      name: "PREF_LONGITUDE",
      type: "string"
    }, {
      name: "PREF_ACCURACY",
      type: "string"
    }, {
      name: "PREF_COLLECT_METH",
      type: "string"
    }, {
      name: "PREF_DESC_CATEGORY",
      type: "string"
    }, {
      name: "PREF_HORIZONTAL_DATUM",
      type: "string"
    }, {
      name: "PREF_SOURCE_SCALE",
      type: "string"
    }, {
      name: "PREF_QA_CODE",
      type: "string"
    }, {
      name: "ASGN_PARTIAL_IND",
      type: "string"
    }, {
      name: "ASGN_PUBLIC_CONTACT",
      type: "string"
    }, {
      name: "ASGN_PUBLIC_PHONE",
      type: "string"
    }, {
      name: "ASGN_PUBLIC_CONTACT_EMAIL",
      type: "string"
    }, {
      name: "BIA_CODE",
      type: "string"
    }, {
      name: "STANDARDIZED_PARENT_COMPANY",
      type: "string"
    }, {
      name: "ASGN_PUBLIC_PHONE_EXT",
      type: "string"
    }
  ],
  POPUP_TEMPLATE_CONTENT: [{
    type: "fields",
    fieldInfos: [{
      fieldName: "TRI_FACILITY_ID",
      label: "Facility ID",
      visible: true
    }, {
      fieldName: "STREET_ADDRESS",
      label: "Address",
      visible: true
    }, {
      fieldName: "CITY_NAME",
      label: "City",
      visible: true
    }, {
      fieldName: "COUNTY_NAME",
      label: "County",
      visible: true
    }, {
      fieldName: "STATE_ABBR",
      label: "State",
      visible: true
    }, {
      fieldName: "ZIP_CODE",
      label: "Zip",
      visible: true,
    }]
  }]
}
