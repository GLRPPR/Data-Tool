import React, { Component } from 'react'
import './App.css'
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'

export default class MapComponent extends Component {

  createMap() {

    dojoRequire(['esri/Map', 'esri/views/MapView'], (Map, MapView) => {
      new MapView({
        container: this.refs.mapView,
        map: new Map({basemap: 'topo'})
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
      <div ref='mapView' className='map-view'></div>
    )
  }
}
