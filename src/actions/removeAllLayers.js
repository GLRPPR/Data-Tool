import { REMOVE_ALL_LAYERS } from './const';

function action() {
  return {
    type: REMOVE_ALL_LAYERS,
    payload: {}
  };
}

module.exports = action;
