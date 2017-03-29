import { UPDATE_BASE_MAP } from './const';

function action(baseMap) {
  return {
    type: UPDATE_BASE_MAP,
    payload: { baseMap }
  };
}

module.exports = action;
