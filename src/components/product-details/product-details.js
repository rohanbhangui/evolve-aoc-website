import React from 'react';

import './product-details.scss';

import { VariantSelector } from '../variant-selector/variant-selector';
import { SizeSelector } from '../size-selector/size-selector';
import AddToCart from '../add-to-cart/add-to-cart';

export default class ProductDetails extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      selectedVariantId: '00001',
      selectedSize: ''
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

  sizeRequiredHandler() {
    this.setState({
      sizeRequiredError: true
    });

    setTimeout(() => {
      this.setState({
        sizeRequiredError: false
      });
    }, 2000);
  }

  render() {
    const { product } = this.props.location.state;

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
      <div className="ProductDetails">
        <section id="details">
          <div className="flex-container">
            <div id="flex-image">
              <img src={ selectedVariantInfo.image } />
            </div>
            <div id="flex-content">
              <h3>{ product.name }</h3>
              <VariantSelector variants={product.variants} selectedVariantId={ this.state.selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler}></VariantSelector>
              <SizeSelector selectedSize={ this.state.selectedSize } selectedSizeHandler={ this.selectedSizeHandler } id={product.productId} sizeRequiredError={ this.state.sizeRequiredError }></SizeSelector>
              <AddToCart payload={productCartPayload} isSizeSelected={!!this.state.selectedSize} sizeRequiredHandler={this.sizeRequiredHandler}></AddToCart>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, vitae, eius. Aspernatur pariatur eveniet voluptatibus quia accusamus ipsam itaque similique amet, reprehenderit magni veritatis exercitationem omnis porro ipsum tenetur eius!</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

