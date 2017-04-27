import React, { Component, PropTypes } from 'react'
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'
import cssmodules from 'react-css-modules'
import styles from './map.cssmodule.scss'
import esriStyles from './esriStyles.scss'
import autoBind from 'react-autobind'
import Draggable, {DraggableCore} from 'react-draggable';
import equal from 'deep-equal'
import _ from 'lodash'

import Legend from './legend/Legend'
import utils from '../utils'
import SearchUtility from './SearchUtility'

class Map extends Component {
  constructor(props) {
    super(props);
    autoBind(this)

    this.state = {
      map: undefined,
      view: undefined
    }
  }

  createMap() {
    const { mapId, actions } = this.props
    dojoRequire(
      [
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer",
        "esri/Map",
        "esri/views/MapView"
      ], (
        FeatureLayer,
        MapImageLayer,
        Map,
        MapView) => {

      const map = new Map({
        basemap: this.props.baseMap,
        layers: []
      })

      const view = new MapView({
        container: this.refs.mapView,
        center: [-83, 42],
        zoom: 5,
        map: map
      })

      this.setState({map, view})

      //actions.setInitialLegend(view, mapId);
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

  componentWillReceiveProps(nextProps) {
    // Check what layers are in redux, vs what is in our state and remove make them the same
    const {layers} = nextProps
    const {map} = this.state
    const correctLayerUUIDs = _.map(
      layers,
      'id'
    )
    const currentLayerUUIDs = _.map(
      this.state.map.layers._items,
      'id'
    )

    const toAdd = _.filter(
      correctLayerUUIDs,
      e => currentLayerUUIDs.indexOf(e) < 0
    )
    const toDelete = _.filter(
      currentLayerUUIDs,
      e => correctLayerUUIDs.indexOf(e) < 0
    )
    _.map(toAdd, e => map.add(
      _.find(
        layers,
        l => l.id == e
      )
    ))
    _.map(toDelete, e => map.remove(
      _.find(
        this.state.map.layers._items,
        l => l.id == e
      )
    ))
  }

  componentDidUpdate(prevProps, prevState) {
    const {addLayer, removeAllLayers} = this.props.actions
    const prevData = prevProps.data.currentData
    const {currentData} = this.props.data
    const {layers} = this.props

    // If there is new data in the data searched for
    // THIS SHOULD NOT DO THIS HERE
    if (typeof currentData != 'undefined'
        && currentData._uuid != prevData._uuid) {
        //TODO: FIRE A REMOVEALL LAYERS ACTION
        utils.createLayerFromCurrentData(
          currentData.features,
          this.state.map,
          (layer) => {
            removeAllLayers()
            addLayer(layer)
          }
        )
      }
  }

  render() {
    const { actions, mapLegend, mapId, data } = this.props
    const { map, view } = this.state
    return (
      <div styleName="map-area">
        <div ref="mapView" style={{height:'100%'}}></div>
        {false && <Draggable
          zIndex={100} >
          <div styleName="legend-container">
            <Legend
              style={{}}
              mapId={mapId}
              actions={actions}
              legends={mapLegend.legends}
              options={mapLegend.options}
              scales={mapLegend.scales}
              views={mapLegend.views}
            />
          </div>
        </Draggable>
        }
        <div styleName="legend-container">
          <SearchUtility
            actions={actions}
          />
        </div>
    </div>
    )
  }
}

Map.displayName = 'Map'
Map.propTypes = {
  baseMap: PropTypes.string,
  actions: PropTypes.shape({
    setInitialLegend: PropTypes.func.isRequired,
    reverseLayerOrder: PropTypes.func.isRequired,
    showLayersNotVisibleForScale: PropTypes.func.isRequired,
    toggleExpanded: PropTypes.func.isRequired,
    toggleNodeExpanded: PropTypes.func.isRequired,
    toggleNodeVisible: PropTypes.func.isRequired,
    toggleShowSettings: PropTypes.func.isRequired,
    fetchLegend: PropTypes.func.isRequired,
    updateBaseMap: PropTypes.func.isRequired
  })
}

export default cssmodules(Map, styles);
