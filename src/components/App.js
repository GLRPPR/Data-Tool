import React, {Component, PropTypes} from 'react'
import extend from 'xtend'
import autoBind from 'react-autobind'
import cssmodules from 'react-css-modules'
import {slide as Menu} from 'react-burger-menu'
import SplitPane from 'react-split-pane'

import styles from './app.cssmodule.scss'
import Map from './Map.js'
import Modal from './Modal.js'
import DataGrid from './DataGrid.js'
import burgerMenuStyles from './burgerMenuStyles.js'
import sliderStyles from './styles/slider.scss'
import utils from '../utils'

class App extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      detailedMenuOpen: false,
      shouldControlSize: false
    }
  }

  componentDidMount(){
    utils.fixDataGrid()
  }
  componentDidUpdate(){
    utils.fixDataGrid()
  }

  componentWillReceiveProps(nextProps){
    const {paneSettings} = this.props.general
    const nextPaneSettings = nextProps.general.paneSettings
    if(this.state.detailedMenuOpen != nextPaneSettings.detailedMenuOpen){
      this.setState({
        detailedMenuOpen: nextPaneSettings.detailedMenuOpen,
        shouldControlSize:true
      })
    }
    else {
      this.setState({shouldControlSize:false})
    }
  }

  render() {
    const {
      actions,
      mapLegend,
      map,
      data,
      general
    } = this.props;

    const {paneSettings} = general

    const paneSize = this.state.shouldControlSize ? paneSettings.pane1Width : undefined

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
            {/*
              <Modal
                actions={actions}
              />
            */}
            <SplitPane
              split="vertical"
              defaultSize="100%"
              className="primary"
              minSize="60%"
              size={
                paneSize
              }
              onChange={size => {
                utils.fixDataGrid()
              }}
              >
              <SplitPane
                split="horizontal"
                defaultSize="60%"
                >
                {/* the map shouldnt need to know about the data, just the layers */}
                <Map
                  mapId="Main Map"
                  baseMap={map.baseMap}
                  layers={map.layers}
                  actions={actions}
                  mapLegend={mapLegend}
                  data={data}
                />
                <DataGrid
                  actions={actions}
                  data={data}
                />
              </SplitPane>
              {/* This is where the next component will be held*/}
              <div>
                <button onClick={
                    () =>{
                      actions.closeDetailedMenu()
                      utils.fixDataGrid()
                    }
                  }/>
              </div>
            </SplitPane>
          </div>
        </main>
      </div>
    )
  }
}

App.displayName = 'App'
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
