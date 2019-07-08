import React from 'react';
import { connect } from "react-redux";
import { removeFromCart } from '../../redux/actions/actions';

import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import './top-bar.scss';

import { totalCart } from '../../utility/func';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

firebase.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;

  console.error("ERROR", errorCode, errorMessage);
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

class TopBar extends React.Component {

  constructor(props) {
    super(props);

    this.totalCart = totalCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.totalQuantity = this.totalQuantity.bind(this);
  }

  totalQuantity(cart) {
    return cart
    .map(item => item.qty)
    .reduce((acc, cur) => acc + cur);
  }

  removeItem(payload) {

    const { removeFromCart } = this.props;
    
    return (e) => {
      removeFromCart(payload);
    }
  }

  render() {

    const { cart } = this.props;

    return (
      <div className="header-container">
        <div id="logo">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </div>
        <div id="main-links">
          <NavLink to="/catalog" activeClassName="selected">Catalog</NavLink>
          <NavLink to="/about" activeClassName="selected">About</NavLink>
          <NavLink to="/contact" activeClassName="selected">Contact</NavLink>
        </div>
        <div id="cart">
          <Link to="/cart">
            <span className={`shopping-cart-icon-container fa-layers fa-2x has-badge ${ cart.length === 0 ? 'display-none' : ''}`} data-count={ cart.length > 0 ? this.totalQuantity(cart) : 0 }>
              {/* <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse" data-count="4b"></i> */}
              <FontAwesomeIcon icon="shopping-cart" size="xs" />
            </span>
          </Link>
          <div id="cart-list">
            <div id="cart-header">
              <h5 id="cart-title">Cart</h5>
              { cart.length <= 0 && (
                <div id="empty-text">Cart is Empty</div>
              )}
            </div>
            <div id="cart-items">
              { cart && cart.map((item, i) =>
                <div className={`cart-item ${ i > 0 ? 'border-top' : ''}`} key={i} data-id={ item.id } data-variant={ item.variant }>
                  <div className="item-image"> <img src={ item.image } alt={ `${ item.name } - ${ item.color }`} /></div>
                  <div className="item-content">
                    <div className="vertical-flex-container">
                      <div className="flex-item">
                        <div className="horizontal-flex-container">
                          <div className="flex-item">
                            <div>{ item.name } - { item.color } ({item.size})</div>
                          </div>
                          <div className="flex-item">
                            <div>{ item.qty } &times; { `$${item.price}` || "$0.00" }</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-item">
                        <div className="item-remove">
                          <button className="link" onClick={ this.removeItem({ id: item.id, variant: item.variant, size: item.size})}>Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div id="cart-footer" className={ cart.length === 0 ? 'empty' : ''}>
              { cart.length > 0 &&
                <Link to="/cart" className="button" id="checkout-button">Checkout | ${this.totalCart(cart)}</Link>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {cart} = state;
  
  return { cart };
};

export default connect(mapStateToProps, { removeFromCart })(TopBar);

