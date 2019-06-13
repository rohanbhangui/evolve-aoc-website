const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.SERVER_PORT;
const request = require('request');
var bodyParser = require("body-parser");
var rand = require("random-key");

// create a GET route
const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;
// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];

oauth2.accessToken = process.env.ACCESS_TOKEN;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

var catalogApiInstance = new SquareConnect.CatalogApi();
var inventoryApiInstance = new SquareConnect.InventoryApi();
var checkoutApiInstance = new SquareConnect.CheckoutApi();

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

app.get('/tax', (req, res) => {

  let postal = req.query.postal;

  request(`https://geocoder.ca/${postal}?json=1`, (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      console.log("DEBUG", JSON.parse(body), JSON.parse(body).standard.prov)
      let bdy = JSON.parse(body);
      if(!bdy.error && bdy.standard.prov && Object.keys(bdy.standard.prov).length > 0) {
        request(`https://api.salestaxapi.ca/v2/province/${bdy.standard.prov}`, (e, r, b) => {
          if (!e && r.statusCode == 200) {
            res.send(JSON.parse(b));
          }
        });
      }
      else {
        res.send({error: 'not a canadian postal code'})
      }
    }
  });
});

app.post('/checkout', (req, res) => {

  let line_items = req.body.cart.map(item => {
    return {
      name: item.name,
      quantity: `${item.qty}`,
      note: `${item.color}(${item.size})`,
      total_money: {
        amount: parseFloat(item.price)*item.qty*100,
        currency: 'CAD'
      },
      base_price_money: {
        amount: parseFloat(item.price)*100,
        currency: 'CAD'
      }
    }
  });
  let tax = req.body.tax;
  let total = req.body.total;
  let merchant_support_email = req.body.support_email;

  let locationId = 'E43ARJ0X4W03V'; //default for online sales

  let body = {
    idempotency_key: rand.generate(),
    order: {
      order: {
        location_id: locationId,
        line_items,
        state: 'OPEN',
        taxes: [
          { 
            name: `Sales Tax (${tax.percentage}%)`,
            percentage: `${tax.percentage}`,
            applied_money: {
              amount: tax.amount*100,
              currency: 'CAD'
            }
          }
        ],
        total_money: {
          amount: total*100,
          currency: 'CAD'
        },
        total_tax_money: {
          amount: tax.amount*100,
          currency: 'CAD'
        }
      },
      idempotency_key: rand.generate(),
    },
    ask_for_shipping_address: true,
    merchant_support_email,
    redirect_url: 'https://localhost:3000/order-complete',
  }

  checkoutApiInstance.createCheckout(locationId, body).then(function(data) {
    res.send(data);
  }, function(error) {
    console.error(error);
  });

});


