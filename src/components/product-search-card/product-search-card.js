import React from 'react';
import { Link } from 'react-router-dom';

import './product-search-card.scss';

import { VariantSelector } from '../variant-selector/variant-selector';
import { SizeSelector } from '../size-selector/size-selector';
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
      color: selectedVariantInfo.color.string,
      price: selectedVariantInfo.price
    }

    return (
      <div className="ProductCard">
        <Link to={{
          pathname: `/product-details/${product.name.toLowerCase().replace(" ", "-")}-${product.variants && selectedVariantInfo.color.string.toLowerCase().replace(" ", "-")}-${product.productId}-${this.state.selectedVariantId}`,
          state: {
            product
          }
        }}>
          <img src={ product.variants && selectedVariantInfo.image} alt={`${product.name}-{selectedVariantInfo.color.string}`} />
        </Link>
        <div id="product-info">
          <h5>{product.name} &mdash; { product.variants && selectedVariantInfo.color.string }</h5>
          <h5>${selectedVariantInfo.price}</h5>
        </div>
        <VariantSelector variants={product.variants} selectedVariantId={ this.state.selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler }></VariantSelector>
        <SizeSelector></SizeSelector>
        <AddToCart payload={productCartPayload} text="Add To Cart"></AddToCart>
      </div>
    )
  }
}

