import React from 'react';
import { connect } from "react-redux";

import logo from '../../assets/images/logo.svg';

import './top-bar.scss';

class TopBar extends React.Component {
  render() {

    const { cart } = this.props;

    return (
      <div className="header-container">
        <div id="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div id="cart">
          <span className={`shopping-cart-icon-container fa-stack fa-2x has-badge ${ cart.length === 0 ? 'display-none' : ''}`} data-count={ cart.length > 0 ? cart.map(item => item.qty).reduce((acc, cur) => acc + cur) : 0 }>
            <i className="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse" data-count="4b"></i>
          </span>
          <div id="cart-list">
            { cart.length <= 0 &&
              <div>Cart is Empty</div>
            }
            { cart && cart.map((item, i) =>

              <div className={`cart-item ${ i > 1 ? 'border-top' : ''}`} key={i} data-id={ item.id } data-variant={ item.variant }>
                <div className="item-image"> <img src={ item.image } alt={ `${ item.name } - ${ item.color }`} /></div>
                <div className="item-content">
                  <div>{ item.name } - { item.color } </div>
                  <div><strong>Qty:</strong> {item.qty}</div>
                </div>
                <div className="item-price">
                  <div>{ item.price || "$0.00" }</div>
                </div>
              </div>
            )}
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

