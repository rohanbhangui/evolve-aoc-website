import React from 'react';

import { PROJECT_NAME } from '../../utility/variables';

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

  componentDidMount() {
    let { match: { params: { step }} } = this.props;

    document.title = `${PROJECT_NAME} - Checkout - ${step}`;
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
