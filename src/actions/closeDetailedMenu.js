import { CLOSE_DETAILED_MENU } from './const';

import utils from '../utils'

function action() {
  return {
    type: CLOSE_DETAILED_MENU,
    payload: {}
  };
}

module.exports = action;
