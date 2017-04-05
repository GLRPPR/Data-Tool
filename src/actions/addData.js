import { ADD_DATA } from './const';

function action(data) {
  return {
    type: ADD_DATA,
    payload: {data}
  };
}

module.exports = action;
