import React from 'react';

import './product-details.scss';

export default class ProductDetails extends React.Component {
	constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { product } = this.props.location.state;
  }

  render() {

    const { product, selectedVariantInfo } = this.props.location.state;
    debugger;
    return (
      <div className="ProductDetails">
        Product Details Page!
      </div>
    )
  }
}

