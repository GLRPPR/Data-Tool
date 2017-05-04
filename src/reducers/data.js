/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import uuid from 'uuid'

import {
  ADD_DATA,
  ADD_DETAILED_DATA
} from '../actions/const'


const initialState = {
  currentData: [{
    _uuid: uuid.v1(),
   features: []
  }]
};

function reducer(state = initialState, action) {
  const {type, payload, data} = action
  switch (type) {
    case ADD_DATA: {
      // TODO: store prior data responses in oldData in state
      return Object.assign({}, state, {
        currentData: {
          _uuid: uuid.v1(),
          features: JSON.parse(payload.data)
        }
      });
    }
    case ADD_DETAILED_DATA: {
      let newCurrentData = Object.assign({}, state.currentData)
      newCurrentData.detailedData = JSON.parse(payload.data)
      return Object.assign({}, state, {
        currentData: newCurrentData
      });
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
