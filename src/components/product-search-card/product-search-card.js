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
      selectedVariantId: '00001',
      selectedSize: '',
      sizeRequiredError: false,
    }

    this.selectedVariantHandler = this.selectedVariantHandler.bind(this);
    this.selectedSizeHandler = this.selectedSizeHandler.bind(this);
    this.sizeRequiredHandler = this.sizeRequiredHandler.bind(this);
  }

  selectedVariantHandler(id) {
    return (e) => {
      this.setState({
        selectedVariantId: id
      });
    }
  }

  selectedSizeHandler(size) {
    return (e) => {
      this.setState({
        selectedSize: size,
        sizeRequiredError: false
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
      price: selectedVariantInfo.price,
      size: this.state.selectedSize
    }

    return (
      <div className="ProductCard">
        <Link to={{
          pathname: `/product-details/${product.name.toLowerCase().replace(" ", "-")}-${product.productId}`,
          state: {
            product
          }
        }}>
          <img src={ product.variants && selectedVariantInfo.image} alt={`${product.name}-{selectedVariantInfo.color.string}`} />
          <div id="product-info">
            <h5>{product.name} &mdash; { product.variants && selectedVariantInfo.color.string } { this.state.selectedSize ? `(${this.state.selectedSize})` : `` }</h5>
            <h5>${selectedVariantInfo.price}</h5>
          </div>
        </Link>
        <VariantSelector variants={product.variants} selectedVariantId={ this.state.selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler }></VariantSelector>
        <SizeSelector selectedSize={ this.state.selectedSize } selectedSizeHandler={ this.selectedSizeHandler } id={product.productId} sizeRequiredError={ this.state.sizeRequiredError }></SizeSelector>
        <AddToCart payload={productCartPayload} isSizeSelected={!!this.state.selectedSize} sizeRequiredHandler={this.sizeRequiredHandler}></AddToCart>
      </div>
    )
  }
}

