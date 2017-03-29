import * as esriLoader from "esri-loader";

import {
  INIT_MAP_OPTIONS,
  SET_LEGEND_DOM_DATA,
  SET_CURRENT_SCALE,
  SET_INITIAL_LEGEND_MAPIMAGELAYER_DATA,
  SET_INITIAL_LEGEND_GRAPHICSLAYER_DATA
} from './../const';

const hookLegend = (legend, callback) => {

  var original = legend._buildLegendDOMForLayer;

  legend._buildLegendDOMForLayer = (a, b) => {

    var result = original.call(legend, a, b);
    callback(result, legend);
    return result;
  };
}

const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const dispatchScaleChange = debounce(function(dispatch, newScale, mapId) {

  dispatch({
    type: SET_CURRENT_SCALE,
    payload: { scale: newScale, mapId }
  });
}, 250);

const createLayerLegend = (view, mapId, layer, dispatch) => {

  esriLoader.dojoRequire(
    ["esri/widgets/Legend"],
    (Legend) => {

    hookLegend(new Legend({ view, layerInfos: [{ layer }] }), (legendDOMForLayer, legend) => {

      setTimeout(() => {

        if (legendDOMForLayer && legendDOMForLayer.widget) {
          dispatch({
            type: SET_LEGEND_DOM_DATA,
            payload: { legendWidget: legendDOMForLayer.widget, mapId }
          });
        }

        if (legend && legend.destroy) {
          legend.destroy();
        }
      }, 250);
    });
  });
}

function action(view, mapId) {

  return function(dispatch) {

    view.then(() => {

      dispatch({
        type: INIT_MAP_OPTIONS,
        payload: { mapId }
      });

      dispatchScaleChange(dispatch, view.scale, mapId);

      view.watch("scale", (newScale) => {
        dispatchScaleChange(dispatch, newScale, mapId);
      });

      let i = 1;

      view.map.layers.forEach((lyr) => {

        lyr.__index = i;
        i++;

        lyr.then(
          loadedLayer => {
            if (loadedLayer.loaded
              && loadedLayer.type
              && (['map-image'].indexOf(loadedLayer.type.toLowerCase()) > -1)
              && loadedLayer.allSublayers
              && loadedLayer.legendEnabled) {

              dispatch({
                type: SET_INITIAL_LEGEND_MAPIMAGELAYER_DATA,
                payload: { view, mapId, layer: loadedLayer }
              });
            }

            if (loadedLayer.loaded
              && loadedLayer.type
              && (['csv', 'feature', 'graphics', 'scene', 'stream'].indexOf(loadedLayer.type.toLowerCase()) > -1)
              && (lyr.url || lyr.source)
              && loadedLayer.legendEnabled) {


              dispatch({
                type: SET_INITIAL_LEGEND_GRAPHICSLAYER_DATA,
                payload: { view, mapId, layer: loadedLayer }
              });

              createLayerLegend(view, mapId, loadedLayer, dispatch);
            }
          },
          error => {
            console.error('Failed to load a layer for use with the legend control.', error);
          });
      });
    });
  };
};

module.exports = action;
