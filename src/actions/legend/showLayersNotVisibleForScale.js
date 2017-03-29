import { SHOW_LAYERS_NOT_VISIBLE_FOR_SCALE } from './../const';

function action(mapId, show) {
  return {
    type: SHOW_LAYERS_NOT_VISIBLE_FOR_SCALE,
    payload: { mapId, show }
  };
}

module.exports = action;
