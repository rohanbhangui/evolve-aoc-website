import React from 'react';
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

import './top-bar.scss';

class TopBar extends React.Component {

  constructor(props) {
    super(props);

    this.totalCart = this.totalCart.bind(this);
  }

  totalCart(cart) {

    const total = cart.map(item => item.qty*item.price).reduce((acc, cur) => acc + cur);

    return total.toFixed(2);
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
          <span className={`shopping-cart-icon-container fa-stack fa-2x has-badge ${ cart.length === 0 ? 'display-none' : ''}`} data-count={ cart.length > 0 ? cart.map(item => item.qty).reduce((acc, cur) => acc + cur) : 0 }>
            <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse" data-count="4b"></i>
          </span>
          <div id="cart-list">
            <div id="cart-header">
              <h5 id="cart-title">Cart</h5>
              { cart.length <= 0 &&
                <div id="empty-text">Cart is Empty</div>
              }
            </div>
            <div id="cart-items">
              { cart && cart.map((item, i) =>

                <div className={`cart-item ${ i > 0 ? 'border-top' : ''}`} key={i} data-id={ item.id } data-variant={ item.variant }>
                  <div className="item-image"> <img src={ item.image } alt={ `${ item.name } - ${ item.color }`} /></div>
                  <div className="item-content">
                    <div>{ item.name } - { item.color } ({item.size})</div>
                  </div>
                  <div className="item-price">
                    <div>{ item.qty } &times; { `$${item.price}` || "$0.00" }</div>
                  </div>
                </div>
              )}
            </div>

            <div id="cart-footer">
              { cart.length > 0 &&
                <button id="checkout-button">Checkout | ${this.totalCart(cart)}</button>
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

export default connect(mapStateToProps)(TopBar);

