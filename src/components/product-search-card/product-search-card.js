import React from 'react';

import './product-search-card.scss';

import { VariantSelector } from '../variant-selector/variant-selector';
import AddToCart from '../add-to-cart/add-to-cart';

export class ProductCard extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      selectedVariantId: '00001'
    }

    this.selectedVariantHandler = this.selectedVariantHandler.bind(this);
  }

  selectedVariantHandler(id) {
    return (e) => {

      console.log("VARIANT", id);
      this.setState({
        selectedVariantId: id
      });
    }
  }

  render() {
    let { product } = this.props;

    return (
      <div className="ProductCard">
        <img src={ product.variants && product.variants.find(variant => variant.variantId === this.state.selectedVariantId).image} />
        <h5>{product.name} &mdash; { product.variants && product.variants.find(variant => variant.variantId === this.state.selectedVariantId).color.string }</h5>
        <VariantSelector variants={product.variants} selectedVariantId={ this.state.selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler}></VariantSelector>
        <AddToCart productId={ product.productId } variantId={ this.state.selectedVariantId } text="Add To Cart"></AddToCart>
      </div>
    )
  }
}

