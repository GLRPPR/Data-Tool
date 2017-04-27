import { REMOVE_LAYER } from './const';

function action(data) {
  return {
    type: REMOVE_LAYER,
    payload: {data}
  };
}

module.exports = action;
