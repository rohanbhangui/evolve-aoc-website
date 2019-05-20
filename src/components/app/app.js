import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Catalog from '../catalog/catalog';
import ProductDetails from '../product-details/product-details';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Catalog} />
      <Route path="/product-details" component={ProductDetails} />
    </Router>
  </Provider>
)

export default App;