import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Catalog from '../catalog/catalog';
import Contact from '../contact/contact';
import About from '../about/about';
import ProductDetails from '../product-details/product-details';
import Cart from '../cart/cart';
import TopBar from '../../components/top-bar/top-bar';
import Footer from '../../components/footer/footer';
import OrderComplete from '../order-complete/order-complete';
import Admin from '../admin/admin';
import Checkout from '../checkout/checkout'

import ScrollToTop from '../../components/scrollToTop/scrollToTop';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCogs, faCheck, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(
  faCogs,
  faCheck,
  faShoppingCart
);

class App extends React.Component {
	render() {

    const { store } = this.props;

		return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <header>
              <TopBar></TopBar>
            </header>
            <Route exact path="/" component={Catalog} />
            <Route exact path="/catalog" component={Catalog} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/product-details" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/order-complete" component={OrderComplete} />
            <Route exact path="/order/:id" component={OrderComplete} />
            <Route exact path="/admin" component={Admin} />
            <footer>
              <Footer></Footer>
            </footer>
          </ScrollToTop>
        </Router>
      </Provider>
    )
	}
}

export default App;