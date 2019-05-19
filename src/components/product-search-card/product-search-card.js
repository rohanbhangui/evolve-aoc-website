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
      this.setState({
        selectedVariantId: id
      });
    }
  }

  render() {
    const { product } = this.props;

    const selectedVariantInfo = product.variants.find(variant => variant.variantId === this.state.selectedVariantId);

    const productCartPayload = {
      name: product.name,
      image: selectedVariantInfo.image,
      id: product.productId,
      variant: this.state.selectedVariantId,
      color: selectedVariantInfo.color.string
    }

    return (
      <div className="ProductCard">
        <img src={ product.variants && selectedVariantInfo.image} />
        <h5>{product.name} &mdash; { product.variants && selectedVariantInfo.color.string }</h5>
        <VariantSelector variants={product.variants} selectedVariantId={ this.state.selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler}></VariantSelector>
        <AddToCart payload={productCartPayload} text="Add To Cart"></AddToCart>
      </div>
    )
  }
}

