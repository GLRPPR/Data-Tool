import React, {Component, PropTypes} from 'react'
import extend from 'xtend'
import autoBind from 'react-autobind'
import cssmodules from 'react-css-modules'

import styles from './app.cssmodule.scss'
import api from '../api'
import Map from './Map.js'
import Navbar from './Navbar.js'

class App extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      args : {
        table: "tri_facility",
        column: "state_abbr",
        operator: "=",
        columnValue: "VA",
        rows: "1:10",
        outputFormat: 'JSON'
      },
      data: ""
    }
  }

  _handleRequest(err, resp, body){
    this.setState({data: resp.body})
  }

  _handleFormChange(params, val, idx, arr, event) {
    const newArgs = extend({}, this.state.args)
    newArgs[params[arr[idx]]] = event
    this.setState({ args: newArgs})
  }

  _handleSubmit(event) {
    const apiResponse = api.request(this.state.args, this._handleRequest)
    event.preventDefault()
  }


  render() {
    const { actions, mapLegend, map } = this.props;

    const parameters = {
      "Table": "table",
      "Column": "column",
      "Operator": "operator",
      "Column Value": "columnValue",
      "Rows": "rows"
    }

    const labels = Object.keys(parameters).map(
      (val, idx, arr) => {
        return (
          <label>
            <input type="text"
              value={this.state.args[parameters[val]]}
              onChange={
                (event) => _handleFormChange(params, val, idx, arr, event)
              }
            />
          </label>
        )
      }
    )

    return (
      <div className="app-component" styleName="app-component">
        {/*<Navbar/>*/}
        {/* Content Wrapper */}
        <div styleName="content">
          <div styleName="map-container">
            <Map
              mapId="Main Map"
              baseMap={map.baseMap}
              actions={actions}
              mapLegend={mapLegend}/>
          </div>
          {/*

          <div className="data-container">

            <form onSubmit={ this._handleSubmit }>
              { labels }
              <input type="submit" value="Submit" />
            </form>

            <div className="info">
              {this.state.data}
            </div>

          </div>
          */}
        </div>

        {/* Footer */}
        <div styleName="footer"> This is a footer </div>
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
