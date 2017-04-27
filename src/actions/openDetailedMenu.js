import { OPEN_DETAILED_MENU } from './const';

import utils from '../utils'

function action() {
  // default to making 60% of page left pane
  const size = Math.floor((utils.getPageWidth() * .6))
  return {
    type: OPEN_DETAILED_MENU,
    payload: {size}
  };
}

module.exports = action;
