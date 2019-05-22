import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/actions';

import './add-to-cart.scss';

class AddToCart extends React.Component {
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
      <div id="AddToCart">
        <button onClick={ this.addToCart(payload, 1) }>Add To Cart</button>
      </div>
    )
  }
}


export default connect(
  null,
  { addToCart }
)(AddToCart)
