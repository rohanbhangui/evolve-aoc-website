import React from 'react';

import './product-details.scss';

import { VariantSelector } from '../variant-selector/variant-selector';
import AddToCart from '../add-to-cart/add-to-cart';

export default class ProductDetails extends React.Component {
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
    const { product } = this.props.location.state;

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
      <div className="ProductDetails">
        <section id="details">
          <div className="flex-container">
            <div id="flex-image">
              <img src={ selectedVariantInfo.image } />
            </div>
            <div id="flex-content">
              <h3>{ product.name }</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, vitae, eius. Aspernatur pariatur eveniet voluptatibus quia accusamus ipsam itaque similique amet, reprehenderit magni veritatis exercitationem omnis porro ipsum tenetur eius!</p>
              <VariantSelector variants={product.variants} selectedVariantId={ this.state.selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler}></VariantSelector>
              <AddToCart payload={productCartPayload} text="Add To Cart"></AddToCart>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
