/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  UPDATE_BASE_MAP,
  ADD_LAYER
} from '../actions/const';
import CONSTANTS from '../utils/constants'

const initialState = {
  baseMap: CONSTANTS.BASEMAPS.TOPO,
  layers: []
};

function reducer(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case UPDATE_BASE_MAP: {
      return Object.assign({}, state, {
        baseMap: payload.baseMap
      });
    }
    case ADD_LAYER: {
      let newLayers = state.layers
      return Object.assign({}, state, {
        layers: newLayers
      });
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
