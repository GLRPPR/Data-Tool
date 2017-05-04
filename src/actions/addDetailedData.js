import { ADD_DETAILED_DATA } from './const';

function action(data) {
  return {
    type: ADD_DETAILED_DATA,
    payload: {data}
  };
}

module.exports = action;
