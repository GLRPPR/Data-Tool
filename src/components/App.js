import React, {Component, PropTypes} from 'react'
import extend from 'xtend'

//import './app.css'
import api from '../api'
import MapComponent from './Map.js'

export default class AppComponent extends Component {
  constructor(props) {
    super(props)
    // This should be taken in by user in the future as a prop to a sub component, this POC
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
    // TODO: pull this out into a utility to bind functions
    this._handleRequest = this._handleRequest.bind(this)
    this._handleFormChange = this._handleFormChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
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
      <div className="app-container">
        <div className="map-half">
          <MapComponent/>
        </div>
        <div className="data-half">
          <form onSubmit={ this._handleSubmit }>
            { labels }
            <input type="submit" value="Submit" />
          </form>
          <div className="info">
            {this.state.data}
          </div>
        </div>
      </div>
    )
  }
}

AppComponent.propTypes = {
};
