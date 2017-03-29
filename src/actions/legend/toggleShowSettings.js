import { TOGGLE_SHOW_SETTINGS } from './../const';

function action(mapId) {
  return {
    type: TOGGLE_SHOW_SETTINGS,
    payload: { mapId }
  };
};

module.exports = action;
