import xhr from 'xhr';
import extend from 'xtend';

const genXhrArgs = (term) => {
  return {
    method: 'GET',
    uri: `http://localhost:3000/tri_facility/search/${term}`,
    headers: {
      "Content-Type": "application/json"
    }
  }
}

exports.request = function (term, callback) {
  xhr(genXhrArgs(term), callback)
}
