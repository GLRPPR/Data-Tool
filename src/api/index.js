import xhr from 'xhr';
import extend from 'xtend';

/*
  Consutructing Envirofacts Api Query

  https://iaspub.epa.gov/enviro/efservice/1/2/3/4/5/6/7

  1: Table Name – At least one table name is required. Up to three table names can be entered. When inserting multiple tables into the URL, they must share an ID or common column, so that the tables can be joined or linked. To retrieve an accurate output it is best to use tables that share an ID column. For example, within the tables that make up the TRI Facility Information, they each share an ID column known as TRI_FACILITY_ID. This can be visually seen within the Envirofacts model pages for various subject areas like TRI Facility Information. Please refer to the Envirofacts database metadata to locate tables that can be joined via ID columns within the RESTful data service.

  2: Column Name – This is an optional entry. Enter a column name and value to limit the results. Multiple columns may be used within the URL to limit the data from a table or tables. The column name is not case sensitive.

  3: Operator – This is an optional entry. This parameter allows users to pass in an operator with the query. Default output is "=" and does not require an operator, but users can enter "<", " >", "!=", "BEGINNING", "CONTAINING", operators as well via the URL. The "BEGINNING" operator will return rows where the start of a column value is equal to the search value. While the "CONTAINING" will return rows where the search value is contained within the column value.

  4: Column Value – This is an optional entry (except when using #2 - Column Name). The column value is queried against the database without modification, so this value is case-sensitive. Use the program system model and queries within Envirofacts to double check the case for the value.

  5: Rows – This is an optional entry. Specify the rows to display by entering 'rows/ <first_row> : <last_row>' Results numbering starts at 0. So to get the first five hundred rows enter rows/0:499 If rows is not specified, the default is the first 10000 rows.

  6: Output Format – This is an optional entry. The default output is in XML; however, output options of JSON, CSV or Excel can be requested in the URL. The output format is not case sensitive.

  7: Count - This is an optional entry and is shown as #7 in the above URL image. Count shows the total number of records that will be returned for this search once the Count option is removed. When Count is used, Excel, CSV, or XML cannot be specified. The column name is not case sensitive.
*/

const defaultArgs = {
  table: undefined,
  column: undefined,      // Optional
  operator: undefined,    // Optional
  columnValue: undefined, // Optional unless column specified
  rows: undefined,        // Optional
  outputFormat: 'JSON',   // Optional
  outputFormat: undefined // Optional
}


const apiUrl = "http://iaspub.epa.gov/enviro/efservice/"

const localRequest = false//(location.hostname === "localhost" || location.hostname === "127.0.0.1")

const genXhrArgs = () => {
  return {
    method: 'GET',
    headers: extend({
      "Content-Type": "application/json"
    },
    localRequest && {
      "Access-Control-Allow-Origin": "*"
    })
  }
}

exports.request = function (args) {
  console.log(localRequest)
  console.log(genXhrArgs())
  // Make HTTP request to envirofacts api
  xhr(extend(genXhrArgs(), {
    //uri: `${apiUrl}/${defaultArgs.table}`
    uri: "https://iaspub.epa.gov/enviro/efservice/tri_facility/state_abbr/VA/rows/499:504/JSON"
  }), function (err, resp, body) {
      // check resp.statusCode
  })
}
