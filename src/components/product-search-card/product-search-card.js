import React from 'react';

import './product-search-card.scss';

import { VariantSelector } from '../variant-selector/variant-selector';

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
        <h1>{product.name} &mdash; { product.variants.find(variant => variant.variantId === this.state.selectedVariantId).color.string }</h1>
        <VariantSelector variants={product.variants} selectedVariantId={ this.state.selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler}></VariantSelector>
      </div>
    )
  }
}

