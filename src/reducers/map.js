/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import extend from 'xtend'
import {
  UPDATE_BASE_MAP,
  HIGHLIGHT_FACILITY,
  ADD_LAYER,
  REMOVE_ALL_LAYERS
} from '../actions/const';
import CONSTANTS from '../utils/constants'

const initialState = {
  baseMap: CONSTANTS.BASEMAPS.GRAY,
  highlighted: "",
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
    case HIGHLIGHT_FACILITY: {
      return Object.assign({}, state, {
        highlighted: payload.data
      });
    }
    case ADD_LAYER: {
      let {layers} = state
      layers.push(payload.data)
      return Object.assign({}, state, {layers});
    }
    case REMOVE_ALL_LAYERS: {
      let {layers} = state
      layers.push(payload.data)
      return Object.assign({}, state, {
        layers: []
      });
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
