import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Catalog from '../catalog/catalog';
import Contact from '../contact/contact';
import ProductDetails from '../product-details/product-details';
import TopBar from '../../components/top-bar/top-bar';
import Footer from '../../components/footer/footer';

import ScrollToTop from '../../components/scrollToTop/scrollToTop';

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
            <Route path="/product-details" component={ProductDetails} />
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