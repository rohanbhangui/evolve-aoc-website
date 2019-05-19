import React from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions/actions";

import logo from '../../assets/images/logo.svg';

import './top-bar.scss';

class TopBar extends React.Component {
	constructor(props) {
    super(props);
  }

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
              <div className="cart-item" key={i} data-id={ item.id } data-variant={ item.variant }>
                <div>{ item.name } - { item.color } </div>
                <div><strong>Qty:</strong> {item.qty}</div>
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

