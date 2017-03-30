import React, {Component} from 'react';
import cssmodules from 'react-css-modules';
import extend from 'xtend'
import autoBind from 'react-autobind'

import styles from './searchutility.cssmodule.scss';
import api from '../api'

class SearchUtility extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      args: {
        table: "tri_facility",
        column: "state_abbr",
        operator: "=",
        columnValue: "IL",
        rows: "1:100",
        outputFormat: 'JSON'
      }
    }
  }

  _handleChange(event) {
    const newStateArgs = extend({}, this.state.args)
    newStateArgs.columnValue = event.target.value
    this.setState({args: newStateArgs});
  }

  _handleResponse(err, resp, body) {
    const {addData} = this.props.actions
    if (err) {
      // TODO: handle retries, maybe incorporate with redux
      console.log("ERROR: error making request.")
    }
    addData(resp.body)
  }

  _sendRequest() {
    const {args} = this.state
    api.request(
      args,
      this._handleResponse.bind(this)
    )
  }

  _handleSubmit(event) {
    this._sendRequest()
    event.preventDefault();
  }

  // These are temporary, should be user input

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this._handleChange.bind(this)}
            placeholder="FIPS Code"
            />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

SearchUtility.displayName = 'SearchUtility';
SearchUtility.propTypes = {};
SearchUtility.defaultProps = {};

export default cssmodules(SearchUtility, styles);
