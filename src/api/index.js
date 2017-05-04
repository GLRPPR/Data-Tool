import xhr from 'xhr';
import extend from 'xtend';

const searchFacility = (term) => {
  return {
    method: 'GET',
    uri: `/api/tri_facility/search/${term}`,
    headers: {
      "Content-Type": "application/json"
    }
  }
}

const searchDetailed = (id) => {
  return {
    method: 'GET',
    uri: `/api/tri_facility/detailed/${id}`,
    headers: {
      "Content-Type": "application/json"
    }
  }
}

exports.request = function (term, callback) {
  xhr(searchFacility(term), callback)
}

exports.requestDetailed = function (id, callback) {
  xhr(searchDetailed(id), callback)
}
