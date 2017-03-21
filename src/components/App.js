import React, {PropTypes} from 'react'

//import './app.css'
import api from '../api'

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const apiResponse = api.request()
    return (<div className="index">{apiResponse}</div>)
  }
}

AppComponent.propTypes = {
};
