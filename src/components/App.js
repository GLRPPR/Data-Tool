import React, {Component, PropTypes} from 'react'
import extend from 'xtend'
import autoBind from 'react-autobind'
import cssmodules from 'react-css-modules'
import {slide as Menu} from 'react-burger-menu'

import styles from './app.cssmodule.scss'
import Map from './Map.js'
import burgerMenuStyles from './burgerMenuStyles.js'

class App extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }

  render() {
    const { actions, mapLegend, map, data } = this.props;

    return (
      <div id="outer-container" style={{height: '100%'}}>
        <Menu
          styles={burgerMenuStyles}
          id="slide"
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}>
        </Menu>
        <main id="page-wrap" style={{height:'100%'}}>
          <div styleName="app-component">
            <Map
              mapId="Main Map"
              baseMap={map.baseMap}
              actions={actions}
              mapLegend={mapLegend}
              data={data}
            />
            <div styleName="footer"> This is a footer </div>
          </div>
        </main>
      </div>
    )
  }
}

App.displayName = 'App'
// This takes in some other props that need to be validated aswell.
App.propTypes = {
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

export default cssmodules(App, styles)
