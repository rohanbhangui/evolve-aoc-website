import React from 'react';
import { connect } from "react-redux";

import { PROJECT_NAME } from '../../utility/variables';
import { totalCart } from '../../utility/func';

import AddressForm from '../../components/address-form/address-form';

import './checkout.scss';

class Checkout extends React.Component {

  constructor(props) {
    super(props);

    this.shippingFormSubmitEventHandler = this.shippingFormSubmitEventHandler.bind(this);
    this.pushToCheckout = this.pushToCheckout.bind(this);
    this.getTax = this.getTax.bind(this);
    this.processValues = this.processValues.bind(this);
    this.totalCart = totalCart.bind(this);
  }

  componentDidMount() {

    document.title = `${PROJECT_NAME} - Checkout`;
  }

  shippingFormSubmitEventHandler(formData) {
    let component = this;
    return (e) => {
      e.preventDefault();

      let formData = new FormData(e.target);

      this.pushToCheckout({
        fullName: formData.get("fullName"),
        addressOne: formData.get("addressOne"),
        addressTwo: formData.get("addressTwo"),
        city: formData.get("city"),
        region: formData.get("region"),
        country: formData.get("country"),
        postalCode: formData.get("postalCode")
      });
    }
  }

  getTax(postal) {
    let { cart } = this.props;
    let component = this;

    return fetch(`/tax?postal=${postal}`)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(myJson) {
      return { percentage: myJson.applicable*100, amount: (myJson.applicable * component.totalCart(cart)).toFixed(2)};
    });
  }

  pushToCheckout(address) {
    let { cart } = this.props;

    let component = this;

    component.setState({
      processing: true
    });

    let { addressOne, addressTwo, city, region, postalCode, country, fullName } = address;

    this.processValues(postalCode).then(([tax]) => {
      let data = {
        tax,
        cart,
        support_email: 'support@evolveaoc.com',
        total: this.totalCart(cart),
        pre_populate_shipping_address: {
          address_line_1: addressOne,
          address_line_2: addressTwo,
          locality: city,
          administrative_district_level_1: region,
          postal_code: postalCode,
          country,
          first_name: fullName.split(" ")[0],
          last_name: fullName.split(" ")[1]
        }
      }

      fetch('/checkout', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        window.location.href=myJson.checkout.checkout_page_url;
      });
    })
  }

  processValues(postal) {
    return Promise.all([this.getTax(postal)]);
  }


  render() {

    return (
      <div id="Checkout">
        <h4>Shipping Details</h4>
        <div id="pages">
          <AddressForm submitEventHandler={ this.shippingFormSubmitEventHandler } />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {

  const {cart} = state;
  
  return { cart };
};

export default connect(mapStateToProps, null)(Checkout);
