import * as esriLoader from "esri-loader";

import {
  RECEIVE_LEGEND_DATA,
  REQUEST_LEGEND_DATA,
  RESET_LEGEND_IS_FETCHING
} from './../const';

function action(url, mapId) {

  return function(dispatch) {

    dispatch({
      type: REQUEST_LEGEND_DATA,
      payload: { url, mapId }
    });

    esriLoader.dojoRequire(
      ["esri/request", "esri/config"],
      (esriRequest, esriConfig) =>
      {
        esriConfig.request.corsDetection = false;

        return esriRequest(url + "/legend", {
          query: {f: "json"},
          responseType: "json"
        })
        .then(
          response => {
            dispatch({
              type: RECEIVE_LEGEND_DATA,
              payload: { layers: response.data.layers, url, mapId }
            });
          },
          error => {
            console.error(error);
            dispatch({
              type: RESET_LEGEND_IS_FETCHING
            });
          }
        );
      });
  };
};

module.exports = action;
