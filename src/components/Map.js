import React, { Component, PropTypes } from 'react'
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'
import cssmodules from 'react-css-modules'
import styles from './map.cssmodule.scss'
import autoBind from 'react-autobind'
import Draggable, {DraggableCore} from 'react-draggable';
import equal from 'deep-equal';

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

      const lakesCounties = new FeatureLayer({
        url: "http://data.isgs.illinois.edu/arcgis/rest/services/Projects/Counties/MapServer/0",
        visible: false,
        type: "feature"
      })

      const usa = new MapImageLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        visible: false,
        type: "map-image"
      });

      const map = new Map({
        basemap: this.props.baseMap,
        layers: [
          lakesCounties,
          usa
        ]
      })

      const view = new MapView({
        container: this.refs.mapView,
        map: map
      })

      this.setState({map, view})

      actions.setInitialLegend(view, mapId);
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

  componentDidUpdate(prevProps, prevState) {
    // Also verify the map loaded correctly
    if(!(equal(
      prevProps.data.currentData,
      this.props.data.currentData))
    && typeof this.props.data.currentData != 'undefined') {
        utils.createLayerFromCurrentData(
          this.state.map,
          this.state.view,
          this.props.data.currentData
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
        <Draggable
          zIndex={100} >
          <div styleName="legend-container">
            <SearchUtility
              actions={actions}
            />
          </div>
        </Draggable>
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
