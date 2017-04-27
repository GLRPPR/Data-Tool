import React, {Component, PropTypes} from 'react'
import cssmodules from 'react-css-modules'
import ReactDataGrid from 'react-data-grid'
import autoBind from 'react-autobind'
import changeCase from 'change-case'
import _ from 'lodash'
import extend from 'xtend'

import CONSTANTS from '../utils/constants'
import styles from './datagrid.cssmodule.scss'
import utils from '../utils'

const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class DataGrid extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      columns: [],
      rows: [],
      originalRows: [],
      filters: {}
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
    const newColumns = _.map(
      Object.keys(nextData.features[0]),
      (featureKey) => {
        if(CONSTANTS.TRI_FIELDS.indexOf(featureKey) > -1){
          return {
            key: featureKey,
            name: changeCase.titleCase(featureKey),
            resizable: true,
            sortable: true,
            filterable: true
          }
        }
      }).filter((e) => {return e})

    const colIds = _.map(newColumns, (col) => {
      return col.key
    })

    // TODO unescape things here
    const newRows = _.map(
      nextData.features,
      (feature) => {
        const colVals = _.zipObject(
          colIds,
          _.map(
            colIds, (id) => {
              return feature[id]
          })
        )
        return colVals
      }
    )

    this.state.columns = newColumns
    this.state.originalRows = newRows
    this.state.rows = newRows
  }

  _handleGridSort(sortColumn, sortDirection) {
    const {rows, operableRows} = this.state
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const sortedRows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows: sortedRows });
  }

  _handleFilterChange(filter) {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  }

  _onRowClick(rowIdx, row) {
    const {
      highlightFacility,
      openDetailedMenu
    } = this.props.actions
    let rows = this.state.rows.slice();
    highlightFacility(rows[rowIdx])
    // TODO add action here to add info to detailed menu
    openDetailedMenu()
  }

  _onClearFilters() {
    this.setState({filters: {} });
  }

  _getRows() {
    return Selectors.getRows(this.state);
  }

  _getSize() {
    return this._getRows().length;
  }

  _rowGetter(rowIdx) {
    let rows = this._getRows();
    return rows[rowIdx];
  }

  render() {
    const {columns, rows} = this.state

    return (
      <div className="datagrid-component" styleName="datagrid-component">
        <ReactDataGrid
          onGridSort={this._handleGridSort.bind(this)}
          columns={columns}
          rowGetter={this._rowGetter.bind(this)}
          enableCellSelect={true}
          rowsCount={this._getSize()}
          minHeight={800}
          onRowClick={this._onRowClick.bind(this)}
          toolbar={
            <Toolbar
              enableFilter={true}
            />
          }
          onAddFilter={this._handleFilterChange.bind(this)}
          onClearFilters={this._onClearFilters.bind(this)}
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
