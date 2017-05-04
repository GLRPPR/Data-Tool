import React, {Component} from 'react';
import cssmodules from 'react-css-modules';
import autoBind from 'react-autobind'
import _ from 'lodash'

import styles from './detailedinfo.cssmodule.scss'

class DetailedInfo extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      info: {
        currentData:{
          detailedData:{
            FACILITY_NAME: "Loading",
            WASTE_MANAGEMENTS: undefined
          }
        }
      }
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("nextprops ", nextProps)
    this.setState({
      info: nextProps.data
    })
  }

  _renderHeader(){
    return (
      <div styleName="facility-name-header"> 
        {
          this.state.info.currentData.detailedData.FACILITY_NAME
        } 
      </div>
    )
  }

  _renderWasteTable(){
    const {closeDetailedMenu} = this.props.actions
    return (
      <button onClick={closeDetailedMenu}>
        close
      </button>
    )
  }

  render() {
    const {WASTE_MANAGEMENTS} = this.state.info.currentData.detailedData
    return (
      <div styleName="detailedinfo">
        <header>
        {
          this._renderHeader()
        }
        </header>
        {WASTE_MANAGEMENTS && this._renderWasteTable()}
      </div>
    )
  }
}

DetailedInfo.displayName = 'DetailedInfo';
DetailedInfo.propTypes = {};
DetailedInfo.defaultProps = {};

export default cssmodules(DetailedInfo, styles)
