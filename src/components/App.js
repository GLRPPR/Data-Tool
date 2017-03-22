import React, {PropTypes} from 'react'

//import './app.css'
import api from '../api'

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    // This should be taken in by user in the future as a prop to a sub component, this POC
    this.state = {
      args :{
        table: "tri_facility",
        column: "state_abbr",
        operator: "=",
        columnValue: "VA",
        rows: "1:10",
        outputFormat: 'JSON'
      },
      data: ""
    }
    this.handleRequest = this.handleRequest.bind(this)
  }

  handleRequest(err, resp, body){
    this.setState({data: resp.body})
  }

  render() {
    const apiResponse = api.request(this.state.args, this.handleRequest)
    return (<div className="index">{this.state.data}</div>)
  }
}

AppComponent.propTypes = {
};
