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


