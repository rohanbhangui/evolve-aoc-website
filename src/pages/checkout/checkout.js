import React from 'react';

import './checkout.scss';

class Checkout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      billing: {},
      shipping: {},
      order: {}
    }
  }

  render() {

    console.log(this.props);

    let { match: { params: { step }} } = this.props;

    return (
      <div id="Checkout">
        <div id="paginator">
        	<div className={`pagination button ${ step === "billing" ? 'active' : '' } ${ step === "shipping" || step === "order" ? 'previous' : '' }`}>Billing Details</div>
        	<div className={`pagination button ${ step === "shipping" ? 'active' : '' } ${ step === "order" ? 'previous' : '' }`}>Shipping Details</div>
        	<div className={`pagination button ${ step === "order" ? 'active' : '' }`}>Final Confirmation</div>
        </div>
      </div>
    )
  }
}


export default Checkout;
