import React from 'react';

import './address-form.scss';

class AddressForm extends React.Component {
	constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(payload, qty) {
    return (e) => {
      e.preventDefault();

      const { addToCart, isSizeSelected, sizeRequiredHandler } = this.props;

      if(isSizeSelected) {
        //this is from redux
        addToCart(payload, qty);
      }
      else {
        sizeRequiredHandler();
      }
    }
  }

  render() {

    const { payload } = this.props;

    return (
      <form id="AddressForm">
      	<label>
      		<span>Name: </span><input type="text" name="fullName" />
      	</label>
      	<label>
      		<span>Address #1: </span><input type="text" name="addressOne" />
      	</label>
      	<label>
      		<span>Address #2: </span><input type="text" name="addressTwo" />
      	</label>
      	<label>
      		<span>City: </span><input type="text" name="city" />
      	</label>
      	<label>
      		<span>State/Province: </span><input type="text" name="region" />
      	</label>
      	<label>
      		<span>Country: </span><input type="text" name="country" />
      	</label>
      	<label>
      		<span>Postal Code: </span><input type="text" name="postalCode" />
      	</label>
      	<input className="button primary" type="submit"/>
      </form>
    )
  }
}


export default AddressForm;
