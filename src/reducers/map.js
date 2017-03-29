/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  UPDATE_BASE_MAP
} from '../actions/const';

import CONSTANTS from '../utils/constants'

const initialState = {
  baseMap: CONSTANTS.BASEMAPS.DARK_GRAY_VECTOR
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BASE_MAP: {
      return Object.assign({}, state, {
        baseMap: payload.baseMap
      });
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
