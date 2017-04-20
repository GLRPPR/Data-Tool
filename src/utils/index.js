import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'
import uuid from 'uuid'
import _ from 'lodash'
import changeCase from 'change-case'
import extend from 'xtend'

import CONSTANTS from './constants'

function convertDMS(dmsSeq) {
  let dmsString = String(dmsSeq)
  const degrees = Number(dmsString.slice(1).slice(-2))
  const minutes = Number(dmsString.slice(1).slice(-2)) / 60
  const seconds = Number(dmsString) / 3600
  return degrees + minutes + seconds
}

function createGeometry(val, Point) {
  if (typeof val.PREF_LONGITUDE != 'undefined'
    && typeof val.PREF_LATITUDE != 'undefined'){
    return new Point({
      x: val.PREF_LONGITUDE * -1,
      y: val.PREF_LATITUDE
    })
  }
  else {
    return new Point({
      x: convertDMS(val.FAC_LONGITUDE),
      y: convertDMS(val.FAC_LATITUDE)
    })
  }
}

function createAttributes(val) {
  return extend(val, {ObjectID: uuid.v1()})
}

exports.createLayerFromCurrentData = function (
  currentData, map, callback
) {
    dojoRequire([
      "esri/layers/FeatureLayer",
      "esri/geometry/Point",
      "esri/renderers/SimpleRenderer",
      "esri/symbols/SimpleMarkerSymbol"
    ], function(
      FeatureLayer,
      Point,
      SimpleRenderer,
      SimpleMarkerSymbol,
    ) {

      console.log("PRINTING MAP")
      console.log(map)

      const fields = CONSTANTS.LAYER_FIELDS

      const popupTemplate = {
        title: "{FACILITY_NAME}",
        content: CONSTANTS.POPUP_TEMPLATE_CONTENT
      };

      const triFacilityRenderer = new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          size: 6,
          color: "black",
          outline: {
            width: 0.5,
            color: "white"
          }
        })
      })

      const graphics = currentData.map((val, idx, arr) => {
        return {
          geometry: createGeometry(val, Point),
          attributes: createAttributes(val)
        };
      })

      const layer = new FeatureLayer({
        source: graphics,
        fields: fields,
        objectIdField: "ObjectID",
        renderer: triFacilityRenderer,
        spatialReference: {
          wkid: 4326
        },
        geometryType: "point",
        popupTemplate,
        id: uuid.v1()
      })

      map.add(layer)
      callback(layer)
    }
  )
}

exports.searchingState = function (term) {
  if(Object.keys(CONSTANTS.STATES).indexOf(term.toUpperCase()) > -1){
    return true
  }
  if(Object.values(CONSTANTS.STATES).indexOf(
    changeCase.titleCase(term))> -1){
    return true
  }
  return false
};

exports.getStateAbbr = function (term) {
  if(Object.keys(CONSTANTS.STATES).indexOf(term.toUpperCase()) > -1){
    return term.toUpperCase()
  }
  if(Object.values(CONSTANTS.STATES).indexOf(
    changeCase.titleCase(term))> -1){
    return _.invert(CONSTANTS.STATES)[changeCase.titleCase(term)]
  }
  return "ERR"
};
