import { TOGGLE_LEGEND_EXPANDED } from './../const'

function action(mapId, expanded) {
  return {
     type: TOGGLE_LEGEND_EXPANDED,
     payload: { mapId, expanded }
   }
}

module.exports = action;
