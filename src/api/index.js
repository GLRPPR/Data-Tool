import xhr from 'xhr';
import extend from 'xtend';

let uri = "http://localhost:3000/tri_facility/state/MN"

const genXhrArgs = (args) => {
  return {
    method: 'GET',
    uri: uri,
    headers: {
      "Content-Type": "application/json"
    }
  }
}

exports.request = function (args, callback) {
  // Make HTTP request to envirofacts api
  xhr(genXhrArgs(args), callback)
}
