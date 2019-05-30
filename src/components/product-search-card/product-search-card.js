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
      this.retrieveInventory(id);

      this.setState({
        selectedVariantId: id,
        selectedSize: ''
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

  componentDidMount() {

    const { selectedVariantId } = this.state;

    this.retrieveInventory(selectedVariantId);
  }

  retrieveInventory(selectedVariantId) {
    const { product } = this.props;

    let variantString = "";

    let inventoryGetter = fetch(`/catalog?id=${product.productId}&variant=${selectedVariantId}`).then(function(response) {
      return response.json(); // pass the data as promise to next then block
    }).then(data => {
      let catalogObjs = data.map(item => {
        return {
          variantApiId: item.id,
          size: item.item_variation_data.sku.split("_")[2],
          qty: 0
        }
      })

      this.setState({
        catalogObjs
      });

      variantString = data.map(item => item.id).join(",");
    
      return fetch(`/inventory?objIds=${variantString}`);
    })
    .then(response => {
      return response.json();
    })
    .catch(error => {
    });

    inventoryGetter.then(inventory =>  {
      let inventorySimple;
      let inventoryCounts = {
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        xxl: 0
      }

      if(inventory) {
        inventorySimple = inventory.map(item => {
         return { variantApiId: item.catalog_object_id, qty: item.quantity };
        });

        //TODO: SIMPLIFY THIS

        // combine arrays of catalog and inventory
        let arr3 = [];

        this.state.catalogObjs.forEach((itm, i) => {
          arr3.push(Object.assign({}, itm, inventorySimple[i]));
        });

        //pull the avlues into an array
        let inventoryCountsArr = arr3.map(item => {
          let obj = {};
          if(item.size === "2xl") {
            obj["xxl"] = item.qty;
          }
          else {
            obj[item.size] = parseInt(item.qty);
          }
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
    const { product } = this.props;
    const { selectedSize, selectedVariantId, sizeRequiredError, inventoryCounts } = this.state;

    const selectedVariantInfo = product.variants.find(variant => variant.variantId === selectedVariantId);

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
      <div className="ProductCard">
        <Link to={{
          pathname: `/product-details/${product.name.toLowerCase().replace(" ", "-")}-${product.productId}`,
          state: {
            product
          }
        }}>
          <img src={ product.variants && selectedVariantInfo.image} alt={`${product.name}-{selectedVariantInfo.color.string}`} />
          <div id="product-info">
            <h5>{product.name} &mdash; { product.variants && selectedVariantInfo.color.string } { selectedSize ? `(${selectedSize})` : `` }</h5>
            <h5>{ selectedSize ? `$${selectedVariantInfo.price}` : ' — ' }</h5>
          </div>
        </Link>
        <VariantSelector variants={product.variants} selectedVariantId={ selectedVariantId } selectedVariantHandler={ this.selectedVariantHandler }></VariantSelector>
        <SizeSelector selectedSize={ selectedSize } selectedSizeHandler={ this.selectedSizeHandler } id={product.productId} sizeRequiredError={ sizeRequiredError } inventoryCounts={inventoryCounts}></SizeSelector>
        <AddToCart payload={productCartPayload} isSizeSelected={!!selectedSize} sizeRequiredHandler={this.sizeRequiredHandler}></AddToCart>
      </div>
    )
  }
}

