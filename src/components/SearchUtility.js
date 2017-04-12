import React, {Component} from 'react';
import cssmodules from 'react-css-modules';
import extend from 'xtend'
import autoBind from 'react-autobind'
import uuid from 'uuid'

import styles from './searchutility.cssmodule.scss';
import api from '../api'

class SearchUtility extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      term: ""
    }
  }

  _handleChange(event) {
    this.setState({term: event.target.value});
  }

  _handleResponse(err, resp, body) {
    const {addData} = this.props.actions
    if (err) {
      console.log("ERROR: error making request.")
    }
    addData(resp.body)
  }

  _sendRequest() {
    api.request(
      this.state.term,
      this._handleResponse.bind(this)
    )
  }

  _handleSubmit(event) {
    this._sendRequest()
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this._handleChange.bind(this)}
            placeholder="Search"
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
