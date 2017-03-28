/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import fetchLegend from '../actions/legend/fetchLegend.js';
import toggleShowSettings from '../actions/legend/toggleShowSettings.js';
import toggleNodeVisible from '../actions/legend/toggleNodeVisible.js';
import toggleNodeExpanded from '../actions/legend/toggleNodeExpanded.js';
import toggleExpanded from '../actions/legend/toggleExpanded.js';
import showLayersNotVisibleForScale from '../actions/legend/showLayersNotVisibleForScale.js';
import reverseLayerOrder from '../actions/legend/reverseLayerOrder.js';
import setInitialLegend from '../actions/legend/setInitialLegend.js';
const actions = {
  setInitialLegend,
  reverseLayerOrder,
  showLayersNotVisibleForScale,
  toggleExpanded,
  toggleNodeExpanded,
  toggleNodeVisible,
  toggleShowSettings,
  fetchLegend
};
module.exports = actions;
