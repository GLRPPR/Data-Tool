/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setInitialLegend,
  reverseLayerOrder,
  showLayersNotVisibleForScale,
  toggleExpanded,
  toggleNodeExpanded,
  toggleNodeVisible,
  toggleShowSettings,
  fetchLegend,
  updateBaseMap,
  addData,
} from '../actions/';
import AppComponent from '../components/App';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, mapLegend, initLegend, map, data} = this.props;
    return (
      <AppComponent
        actions={actions}
        initLegend={initLegend}
        mapLegend={mapLegend}
        map={map}
        data={data}/>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.shape({
    setInitialLegend: PropTypes.func.isRequired,
    reverseLayerOrder: PropTypes.func.isRequired,
    showLayersNotVisibleForScale: PropTypes.func.isRequired,
    toggleExpanded: PropTypes.func.isRequired,
    toggleNodeExpanded: PropTypes.func.isRequired,
    toggleNodeVisible: PropTypes.func.isRequired,
    toggleShowSettings: PropTypes.func.isRequired,
    fetchLegend: PropTypes.func.isRequired,
    updateBaseMap: PropTypes.func.isRequired,
    addData: PropTypes.func.isRequired,
  }),
  map: PropTypes.shape({}),
  data: PropTypes.shape({})
};
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {
    mapLegend: state.mapLegend,
    map: state.map,
    data: state.data
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    setInitialLegend,
    reverseLayerOrder,
    showLayersNotVisibleForScale,
    toggleExpanded,
    toggleNodeExpanded,
    toggleNodeVisible,
    toggleShowSettings,
    fetchLegend,
    updateBaseMap,
    addData,
    addLayer
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
