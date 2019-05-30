const express = require('express');
const app = express();

require('dotenv').config();


const port = process.env.SERVER_PORT;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.ACCESS_TOKEN;

var apiInstance = new SquareConnect.CatalogApi();

var opts = { 
  'cursor': "", // String | The pagination cursor returned in the previous response. Leave unset for an initial request. See [Pagination](/basics/api101/pagination) for more information.
  'types': "ITEM_VARIATION" // String | An optional case-insensitive, comma-separated list of object types to retrieve, for example `ITEM,ITEM_VARIATION,CATEGORY,IMAGE`.  The legal values are taken from the [CatalogObjectType](#type-catalogobjecttype) enumeration, namely `ITEM`, `ITEM_VARIATION`, `CATEGORY`, `DISCOUNT`, `TAX`, `MODIFIER`, `MODIFIER_LIST`, or `IMAGE`.
};

var body = new SquareConnect.SearchCatalogObjectsRequest();

body.object_types=['ITEM_VARIATION'];
body.query=[{sku: '00001_00002_s'}];

console.log("DEBUG", body);

app.get('/catalog', (req, res) => {
  // apiInstance.listCatalog(opts).then(function(data) {

  //   res.send(data.objects);
  // }, function(error) {
  //   console.error(error);
  // });

  apiInstance.searchCatalogObjects(body).then(function(data) {

    // console.log('API called successfully. Returned data: ' + data);
    res.send(data);
  }, function(error) {
    console.error(error);
  });


});


