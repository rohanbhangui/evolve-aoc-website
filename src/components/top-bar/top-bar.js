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
          <i className="fa fa-shopping-cart"></i>
          <div id="cart-list">
            Cart is Empty

            { cart && cart.map((item, i) =>
              <div>{ item.product }_{ item.variant }: { item.qty } </div>
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

