import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'
import uuid from 'uuid'
import _ from 'lodash'
import changeCase from 'change-case'

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

      var fields = [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }]

      var triFacilityRenderer = new SimpleRenderer({
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
          attributes: { ObjectID: idx }
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
