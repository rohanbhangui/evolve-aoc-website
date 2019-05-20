import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Catalog from '../catalog/catalog';
import ProductDetails from '../product-details/product-details';
import TopBar from '../top-bar/top-bar';

class App extends React.Component {
	render() {

    const { store } = this.props;

		return (
      <Provider store={store}>
        <Router>
          <header>
            <TopBar></TopBar>
          </header>
          <Route exact path="/" component={Catalog} />
          <Route path="/product-details" component={ProductDetails} />
        </Router>
      </Provider>
    )
	}
}

export default App;