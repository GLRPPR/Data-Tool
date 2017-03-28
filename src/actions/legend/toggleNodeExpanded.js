import { TOGGLE_LEGEND_NODE_EXPANDED } from './../const'

function action(nodeId, mapId) {
  return {
    type: TOGGLE_LEGEND_NODE_EXPANDED,
    payload: { nodeId, mapId }
  }
}

module.exports = action;
