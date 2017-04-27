/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import {
  OPEN_DETAILED_MENU,
  CLOSE_DETAILED_MENU
} from '../actions/const'

import utils from '../utils'

const initialState = {
  paneSettings: {
    pane1Width: utils.getPageWidth(),
    detailedMenuOpen: false
  }
};

function reducer(state = initialState, action) {
  const {type, payload, data} = action
  switch (type) {
    case OPEN_DETAILED_MENU: {
      let paneSettings = Object.assign({}, state.paneSettings)

      paneSettings.pane1Width = payload.size
      paneSettings.detailedMenuOpen = true

      return Object.assign({}, state, {
          paneSettings
      });
    }
    case CLOSE_DETAILED_MENU: {
      let paneSettings = Object.assign({}, state.paneSettings)

      paneSettings.detailedMenuOpen = false
      paneSettings.pane1Width = utils.getPageWidth()

      return Object.assign({}, state, {
          paneSettings
      });
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
