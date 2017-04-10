import React, {Component, PropTypes} from 'react'
import cssmodules from 'react-css-modules'
import styles from './datagrid.cssmodule.scss'
import ReactDataGrid from 'react-data-grid'
import autoBind from 'react-autobind'
import changeCase from 'change-case'

import CONSTANTS from '../utils/constants'

class DataGrid extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      columns: [],
      rows: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextData = nextProps.data.currentData
    const {currentData} = this.props.data
    if (typeof currentData != 'undefined'
        && typeof nextData._uuid != 'undefined'
        && currentData._uuid != nextData._uuid) {
          this._updateDataTable(nextProps)
      }
  }

  _updateDataTable(nextProps) {
    const nextData = nextProps.data.currentData
    const newColumns = Object.keys(
      nextData.features[0]).map(
          (curVal, idx, arr) => {
            if(CONSTANTS.TRI_FIELDS.indexOf(curVal) > -1){
              return {
                key: curVal,
                name: changeCase.titleCase(curVal),
                resizable: true
              }
            }
          }).filter((e) => {return e})

    this.state.columns = newColumns
  }

  _rowGetter(i) {
    const {rows} = this.state
    return rows[i];
  }

  render() {
    const {columns, rows} = this.state

    return (
      <div className="datagrid-component" styleName="datagrid-component">
        <ReactDataGrid
          columns={columns}
          rowGetter={this._rowGetter.bind(this)}
          rowsCount={rows.length}
          minHeight={500}
        />
      </div>
    );
  }
}

DataGrid.displayName = 'DataGrid';
DataGrid.propTypes = {
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

export default cssmodules(DataGrid, styles);
