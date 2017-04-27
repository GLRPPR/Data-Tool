import { HIGHLIGHT_FACILITY } from './const';

function action(data) {
  return {
    type: HIGHLIGHT_FACILITY,
    payload: {data}
  };
}

module.exports = action;
