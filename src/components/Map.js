import React, { Component } from 'react'
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'
import cssmodules from 'react-css-modules'
import styles from './map.cssmodule.scss'

import CONSTANTS from '../utils/constants'

class Map extends Component {
  createMap() {
    dojoRequire(
      [
        "esri/layers/FeatureLayer",
         "esri/Map",
         "esri/views/MapView"
      ], (
        FeatureLayer,
        Map,
        MapView) => {
      const fl = new FeatureLayer({
        url: "http://data.isgs.illinois.edu/arcgis/rest/services/Projects/Counties/MapServer/0"
      })
      const esriMap = new Map({
        basemap: CONSTANTS.BASEMAPS.DARK_GRAY_VECTOR,
        layers: [fl]
      })
      const view = new MapView({
        container: this.refs.mapView,
        map: esriMap
      })
    })
  }

  componentWillMount() {
    if (!isLoaded()) {
      bootstrap((err) => {
        if (err) {
          console.error(err)
        }
        this.createMap()
      }, {
        url: 'https://js.arcgis.com/4.1/'
      })
    } else {
      this.createMap()
    }
  }

  render() {
    return (
      <div ref='mapView' className="map-component" styleName="map-component">
      </div>
    )
  }
}


Map.displayName = 'Map';
Map.propTypes = {};
Map.defaultProps = {};

export default cssmodules(Map, styles);
