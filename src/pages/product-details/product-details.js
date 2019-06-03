import React from 'react';

import { VariantSelector } from '../../components/variant-selector/variant-selector';
import { SizeSelector } from '../../components/size-selector/size-selector';
import AddToCart from '../../components/add-to-cart/add-to-cart';

import './product-details.scss';

let controller;
let signal;

export default class ProductDetails extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      selectedVariantId: '00001',
      selectedSize: '',
      sizeRequiredError: false,
      inventoryCounts: {
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        xxl: 0
      },
      catalogObjs: []
    }

    this.selectedVariantHandler = this.selectedVariantHandler.bind(this);
    this.selectedSizeHandler = this.selectedSizeHandler.bind(this);
    this.sizeRequiredHandler = this.sizeRequiredHandler.bind(this);
    this.retrieveInventory = this.retrieveInventory.bind(this);
  }

  selectedVariantHandler(id) {
    return (e) => {
      if(id !== this.state.selectedVariantId) {
        this.retrieveInventory(id);

        this.setState({
          selectedVariantId: id,
          selectedSize: ''
        });
      }
    }
  }

  selectedSizeHandler(size) {
    return (e) => {
      if(size !== this.state.selectedSize) {
        this.setState({
          selectedSize: size,
          sizeRequiredError: false
        });
      }
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

  componentDidMount() {

    const { selectedVariantId } = this.state;

    this.retrieveInventory(selectedVariantId, true);
  }

  retrieveInventory(selectedVariantId, onMount=false) {

    if(!onMount) {
      if (controller !== undefined) {
        // Cancel the previous request
        controller.abort();
      }

      // Feature detect
      if ("AbortController" in window) {
        controller = new AbortController;
        signal = controller.signal;
      }
    }


    const { product } = this.props.location.state;

    let inventoryGetter = fetch(`/catalog?id=${product.productId}&variant=${selectedVariantId}`, {signal})
    .then(response => response.json())
    .then(data => {
      let catalogObjs = data.map(item => {
        return {
          variantApiId: item.id,
          size: item.item_variation_data.sku.split("_")[item.item_variation_data.sku.split("_").length - 1],
          qty: 0
        }
      })

      this.setState({
        catalogObjs
      });
    
      return fetch(`/inventory?objIds=${data.map(item => item.id).join(",")}`, {signal});
    })
    .then(response => response.json())
    .catch(error => {
    });

    inventoryGetter.then(inventory => {
      let inventorySimple;
      let inventoryCounts = {
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        xxl: 0
      }

      if(inventory) {

        inventorySimple = inventory.reduce((obj, item) => {
           obj[item.catalog_object_id] = item.quantity;
           return obj
         }, {})

        //pull the avlues into an array
        let inventoryCountsArr = this.state.catalogObjs.map(item => {
          let obj = {};
          obj[item.size] = parseInt(inventorySimple[item.variantApiId]) || 0;
          
          return obj;
        });

        //combine array into a single object
        inventoryCounts = Object.assign({}, ...inventoryCountsArr);
      }

      this.setState({
        inventoryCounts
      });
    });
  }
  
  render() {
    const { product } = this.props.location.state;

    const { selectedSize, selectedVariantId, sizeRequiredError, inventoryCounts } = this.state;

    const selectedVariantInfo = product.variants.find(variant => variant.variantId === this.state.selectedVariantId);

    const productCartPayload = {
      name: product.name,
      image: selectedVariantInfo.image,
      id: product.productId,
      variant: selectedVariantId,
      color: selectedVariantInfo.color.string,
      price: selectedVariantInfo.price,
      size: selectedSize
    }
    
    return (
      <div className="ProductDetails">
        <section id="details">
          <div className="flex-container">
            <div id="flex-image">
              <img src={ selectedVariantInfo.image } alt={ `${product.name}-${selectedVariantInfo.color.string}`} />
            </div>
            <div id="flex-content">
              <h3>{ product.name }</h3>
              <h5>{ selectedSize ? `$${selectedVariantInfo.price}` : ' — ' }</h5>
              <VariantSelector variants={product.variants} selectedVariantId={ selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler}></VariantSelector>
              <SizeSelector selectedSize={ selectedSize } selectedSizeHandler={ this.selectedSizeHandler } id={product.productId} sizeRequiredError={ sizeRequiredError } inventoryCounts={inventoryCounts}></SizeSelector>
              <AddToCart payload={productCartPayload} isSizeSelected={!!selectedSize} sizeRequiredHandler={this.sizeRequiredHandler}></AddToCart>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, vitae, eius. Aspernatur pariatur eveniet voluptatibus quia accusamus ipsam itaque similique amet, reprehenderit magni veritatis exercitationem omnis porro ipsum tenetur eius!</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

