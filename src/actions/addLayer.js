import { ADD_LAYER } from './const';

function action(data) {
  return {
    type: ADD_LAYER,
    payload: {data}
  };
}

module.exports = action;
