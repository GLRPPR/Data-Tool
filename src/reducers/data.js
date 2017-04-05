/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
  ADD_DATA
} from '../actions/const'


const initialState = {};

function reducer(state = initialState, action) {
  const {type, payload, data} = action
  switch (type) {
    case ADD_DATA: {
      // TODO: store prior data responses in oldData in state
      return Object.assign({}, state, {
        currentData: JSON.parse(payload.data)
      });
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
