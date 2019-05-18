import React from 'react';
import logo from '../../assets/images/logo.svg';

import './top-bar.scss';

export class TopBar extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="header-container">
        <div id="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div id="cart">
          <i className="fa fa-shopping-cart"></i>
          <div id="cart-list">
            Cart is Empty
          </div>
        </div>
      </div>
    )
  }
}

