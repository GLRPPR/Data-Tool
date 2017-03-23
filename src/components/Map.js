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

// modules/Map.js
//import React from 'react'
//import * as esriLoader from 'esri-loader'
//
//export default class MapComponent extends React.Component{
//  constructor(props) {
//    super(props)
//
//    // Set state to declare when map loaded
//    this.state = {
//      mapLoaded: false
//    }
//
//    this._createMap = this._createMap.bind(this)
//  }
//
//  componentDidMount () {
//    if (!esriLoader.isLoaded()) {
//      const options = {
//        url: '//js.arcgis.com/3.18/'
//      }
//      esriLoader.bootstrap((err) => {
//        if (err) {
//          console.error(err)
//        }
//        this._createMap()
//      }, options)
//    } else {
//      this._createMap()
//    }
//  }
//
//  _createMap () {
//    // Sample item id, to be changed
//    const itemId = '8e42e164d4174da09f61fe0d3f206641'
//    // require the map class
//    esriLoader.dojoRequire(['esri/arcgis/utils'], (arcgisUtils) => {
//      // create a map at a DOM node in this component
//      arcgisUtils.createMap(itemId, this.refs.map)
//      .then((response) => {
//        // hide the loading indicator
//        // and show the map title
//        // NOTE: this will trigger a rerender
//        this.setState({
//          mapLoaded: true,
//          item: response.itemInfo.item
//        })
//      }, (err) => {
//        this.setState({
//          mapLoaded: true,
//          error: err.message || err
//        })
//      })
//    })
//  }
//
//  render() {
//    const item = this.state.item
//    const title = item && item.title
//    const link = item ? `https://www.arcgis.com/home/item.html?id=${item.id}` : 'javascript:void(0)'
//    // set up the DOM to attach the map to
//    return (
//      <div>
//        <div className='map-title'>
//          <a href={link}>{title}</a>
//        </div>
//        <div ref='map'/>
//        <div className='loading' >Loading...</div>
//      </div>
//    )
//  }
//}
