import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/actions';

import './add-to-cart.scss';

class AddToCart extends React.Component {
	constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(product, variant, qty) {
    return (e) => {
      e.preventDefault();

      this.props.addToCart(product,variant, qty)
    }
  }

  render() {

    const { text, productId, variantId } = this.props;

    return (
      <button onClick={ this.addToCart(productId, variantId, 1) }>{ text }</button>
    )
  }
}


export default connect(
  null,
  { addToCart }
)(AddToCart)
