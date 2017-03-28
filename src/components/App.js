import React, {Component, PropTypes} from 'react'
import extend from 'xtend'
import cssmodules from 'react-css-modules'
import autobind from 'autobind-decorator'

import styles from './app.cssmodule.scss'
import api from '../api'
import Map from './Map.js'

@autobind
class App extends Component {
  constructor(props) {
    super(props)

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

        {/* Content Wrapper */}
        <div styleName="content">
          <div styleName="map-container">
            <Map/>
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
        <div styleName="footer" />
      </div>
    )
  }
}

App.displayName = 'App'
App.propTypes = {}
App.defaultProps = {}

export default cssmodules(App, styles)
