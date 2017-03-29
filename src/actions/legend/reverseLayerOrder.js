import { REVERSE_LAYER_ORDER } from './../const';

function action(mapId) {
  return {
    type: REVERSE_LAYER_ORDER,
    payload: { mapId }
  };
};

module.exports = action;
