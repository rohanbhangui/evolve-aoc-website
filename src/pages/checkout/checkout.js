import React from 'react';

import { PROJECT_NAME } from '../../utility/variables';

import AddressForm from '../../components/address-form/address-form';

import './checkout.scss';

class Checkout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      billing: {},
      shipping: {},
      order: {},
      sameAddress: false
    }

    this.billingFormSubmitEventHandler = this.billingFormSubmitEventHandler.bind(this);
    this.shippingFormSubmitEventHandler = this.shippingFormSubmitEventHandler.bind(this);

    this.toggleSameAddress = this.toggleSameAddress.bind(this);
  }

  componentDidMount() {
    let { match: { params: { step }} } = this.props;

    document.title = `${PROJECT_NAME} - Checkout - ${step.charAt(0).toUpperCase() + step.slice(1)}`;
  }

  billingFormSubmitEventHandler() {
    let component = this;
    return (e) => {
      e.preventDefault();

      let formData = new FormData(e.target);

      component.setState({
        billing: {
          fullName: formData.get("fullName"),
          addressOne: formData.get("addressOne"),
          addressTwo: formData.get("addressTwo"),
          city: formData.get("city"),
          region: formData.get("region"),
          country: formData.get("country"),
          postalCode: formData.get("postalCode")
        }
      });
    }
  }

  shippingFormSubmitEventHandler(formData) {
    let component = this;
    return (e) => {
      e.preventDefault();

      let formData = new FormData(e.target);

      component.setState({
        billing: {
          fullName: formData.get("fullName"),
          addressOne: formData.get("addressOne"),
          addressTwo: formData.get("addressTwo"),
          city: formData.get("city"),
          region: formData.get("region"),
          country: formData.get("country"),
          postalCode: formData.get("postalCode")
        }
      });

      //TODO: verify if best practice
      this.props.history.push('/checkout/billing');
    }
  }

  toggleSameAddress() {
    let component = this;
    return (e) => {
      component.setState( prevState => {
        return {
          sameAddress: !prevState.sameAddress
        }
      });
    }
  }

  render() {

    let { match: { params: { step }} } = this.props;
    let { sameAddress } = this.state;

    console.log(sameAddress);

    return (
      <div id="Checkout">
        <div id="paginator">
          <div className={`pagination button ${ step === "shipping" ? 'active' : '' } ${ step === "shipping" || step === "order" ? 'previous' : '' }`}>Shipping Details</div>
        	<div className={`pagination button ${ step === "billing" ? 'active' : '' }  ${ step === "order" ? 'previous' : '' }`}>Billing Details</div>
        	<div className={`pagination button ${ step === "order" ? 'active' : '' }`}>Final Confirmation</div>
        </div>

        <div id="pages">
          { step === "shipping" && (
            <div id="shipping-step-content">
              <AddressForm submitEventHandler={ this.shippingFormSubmitEventHandler } />
            </div> 
          )}
          { step === "billing" && (
            <div id="billing-step-content">
              <label><input type="checkbox" value={sameAddress} onChange={ this.toggleSameAddress } /> Use shipping address</label>
              { sameAddress && (
                <AddressForm submitEventHandler={ this.shippingFormSubmitEventHandler } />
              )}
            </div> 
          )}
        </div>
        
      </div>
    )
  }
}


export default Checkout;
