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

var catalogApiInstance = new SquareConnect.CatalogApi();
var inventoryApiInstance = new SquareConnect.InventoryApi();

app.get('/catalog', (req, res) => {

  var body = new SquareConnect.SearchCatalogObjectsRequest();

  body.object_types=['ITEM_VARIATION', "ITEM"];
  body.include_related_objects = true;
  body.query = {
    prefix_query: {
      attribute_name: 'sku',
      attribute_prefix: `${req.query.id}_${req.query.variant}`
    }
  }

  catalogApiInstance.searchCatalogObjects(JSON.stringify(body)).then(function(data) {
    // console.log('API called successfully. Returned data: ' + data);
    res.send(data);
  }, function(error) {
    console.error(error);
  });


});


app.get('/inventory', (req, res) => {

  var opts = { 
    'locationIds': "", // String | The [Location](#type-location) IDs to look up as a comma-separated list. An empty list queries all locations.
    'cursor': "" // String | A pagination cursor returned by a previous call to this endpoint. Provide this to retrieve the next set of results for the original query.  See [Pagination](/basics/api101/pagination) for more information.
  };

  console.log("DEBUG:", req.query.objIds)

  inventoryApiInstance.retrieveInventoryCount(`#${req.query.objIds`, opts).then(function(data) {
    console.log(data);
    res.send(data);
  }, function(error) {
    console.error(error);
  });
})


