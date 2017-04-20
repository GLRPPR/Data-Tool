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
    const {onSubmit} = this.props
    this._sendRequest()
    event.preventDefault();
    onSubmit()
  }

  render() {
    return (
      <div
        className="searchutility-component" styleName="searchutility-component"
      >
        <form onSubmit={this._handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.value}
            onChange={this._handleChange.bind(this)}
            placeholder="Search"/>
          <span
            id="search-button"
            onClick={this._handleSubmit.bind(this)}
            className="esri-icon-search"
            style={{
              "position": "relative",
              "zIndex": 1,
              "left": "-20px",
              "top": "1px",
              "color": "#7B7B7B",
              "cursor": "pointer",
              "width": 0
            }}/>
        </form>
      </div>
    );
  }
}

SearchUtility.displayName = 'SearchUtility';
SearchUtility.propTypes = {};
SearchUtility.defaultProps = {
  onSubmit: () => {}
};

export default cssmodules(SearchUtility, styles);
