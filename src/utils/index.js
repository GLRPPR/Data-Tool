import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'


function convertDMS(dmsseq) {

}

function createGeometry(val) {
  if (typeof val.PREF_LONGITUDE != 'undefined'
    && typeof val.PREF_LATITUDE != 'undefined'){
    return new Point({
      x: val.PREF_LONGITUDE * -1,
      y: val.PREF_LATITUDE
    })
  }
  else {
    return new Point({
      x: convertDMS(val.FAC_LONGITUDE)
      y: convertDMS(val.FAC_LATITUDE)
    })
  }
}

exports.createLayerFromCurrentData = function (
  map, view, currentData
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

      let lyr;

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
          geometry: createGeometry(val),
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
        geometryType: "point"
      })
      console.log("Graphics: ")
      console.log(graphics)
      console.log("Layer: ")
      console.log(layer)

      map.add(layer)

    }
  )
}
