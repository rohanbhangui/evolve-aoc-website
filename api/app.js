const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.SERVER_PORT;

// create a GET route
const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;
// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];

oauth2.accessToken = process.env.ACCESS_TOKEN;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

var catalogApiInstance = new SquareConnect.CatalogApi();
var inventoryApiInstance = new SquareConnect.InventoryApi();

app.get('/catalog', (req, res) => {

  var body = new SquareConnect.SearchCatalogObjectsRequest();

  body.object_types=['ITEM_VARIATION'];
  body.query = {
    prefix_query: {
      attribute_name: 'sku',
      attribute_prefix: `${req.query.id}_${req.query.variant}`
    }
  }

  catalogApiInstance.searchCatalogObjects(JSON.stringify(body)).then(function(data) {
    // console.log('API called successfully. Returned data: ' + data);
    res.send(data.objects);
  }, function(error) {
    console.error(error);
  });
});

app.get('/inventory', (req, res) => {
  var body = new SquareConnect.BatchRetrieveInventoryCountsRequest();

  body.object_types=['ITEM_VARIATION'];
  body.catalog_object_ids = req.query.objIds.split(",");

  inventoryApiInstance.batchRetrieveInventoryCounts(JSON.stringify(body)).then(function(data) {
    console.log(data);
    res.send(data.counts);
  }, function(error) {
    console.error(error);
  });
});

app.get('/access', (req, res) => {

  var tokenApiInstance = new SquareConnect.OAuthApi();

  var body = new SquareConnect.ObtainTokenRequest(); // ObtainTokenRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.

  body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: process.env.GUEST_USER_AUTHORIZATION_CODE
  }

  tokenApiInstance.obtainToken(body).then(function(data) {
    console.log(data);
    res.send(data);
  }, function(error) {
    console.error(error);
  });
});


