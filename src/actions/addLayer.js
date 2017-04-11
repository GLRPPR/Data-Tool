import { ADD_LAYER } from './const';

function action(layer) {
  return {
    type: ADD_LAYER,
    payload: {layer}
  };
}

module.exports = action;
