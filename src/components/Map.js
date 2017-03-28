import React, { Component, PropTypes } from 'react'
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'
import cssmodules from 'react-css-modules'
import styles from './map.cssmodule.scss'
import autobind from 'autobind-decorator'
import Draggable, {DraggableCore} from 'react-draggable';

import Legend from './legend/Legend'

@autobind
class Map extends Component {
  constructor(props) {
    super(props);
  }

  createMap() {
    const { mapId, actions } = this.props;
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

  render() {
    const { actions, mapLegend, mapId } = this.props
    return (
      <div styleName="map-component">
        <div ref="mapView" styleName="map-component"></div>
        <Draggable
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
