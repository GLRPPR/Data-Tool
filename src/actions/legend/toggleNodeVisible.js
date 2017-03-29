import { TOGGLE_LEGEND_NODE_VISIBLE } from './../const';

function action(nodeId, mapId) {
  return {
    type: TOGGLE_LEGEND_NODE_VISIBLE,
    payload: { nodeId, mapId }
  };
};

module.exports = action;
