import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { ProductCard } from '../product-search-card/product-search-card';
import TopBar from '../top-bar/top-bar';


import './app.scss';

firebase.initializeApp({
  apiKey: "AIzaSyD9Ymp-2H6xWhjdXrVH9AjSJcPMCQvE8ow",
  authDomain: "evolve-aoc-landing.firebaseapp.com",
  projectId: "evolve-aoc-landing",
});

let db = firebase.firestore();

class App extends React.Component {

  constructor(props) {
    super(props);

    this.addData = this.addData.bind(this);

    window.addData = this.addData;
  }
  componentDidMount() {

    const products = db.collection("products");

    let component = this;

    products.get().then(function(querySnapshot) {   
        let products = querySnapshot.docs.map( (item, index) => item.data()).sort((a,b) => (a.productId > b.productId) ? 1 : ((b.productId > a.productId) ? -1 : 0));

        component.setState({
          products,
          selectedVariantIndex: 0
        });
    });
  }

  addData(e) {

    db.collection("products").add({
      name: 'Hoodie 1',
      productId: '00001',
      categories: {
        1: 'Unisex',
        2: 'Tops',
        3: 'Hoodies'
      },
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/450/FF0000/000000',
          price: "39.99",
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/450/00FF00/000000',
          price: "38.99",
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/450/0000FF/000000',
          price: "37.99",
          color: {
            string: 'blue',
            value: '#0000ff'
          }
        }
      ]
    });

    db.collection("products").add({
      name: 'Hoodie 2',
      productId: '00002',
      categories: {
        1: 'Unisex',
        2: 'Tops',
        3: 'Hoodies'
      },
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/450/FF0000/000000',
          price: "39.99",
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/450/00FF00/000000',
          price: "38.99",
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/450/0000FF/000000',
          price: "37.99",
          color: {
            string: 'blue',
            value: '#0000ff'
          }
        }
      ]
    });

    db.collection("products").add({
      name: 'Hoodie 3',
      productId: '00003',
      categories: {
        1: 'Unisex',
        2: 'Tops',
        3: 'Hoodies'
      },
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/450/FF0000/000000',
          price: "39.99",
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/450/00FF00/000000',
          price: "38.99",
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/450/0000FF/000000',
          price: "37.99",
          color: {
            string: 'blue',
            value: '#0000ff'
          }
        }
      ]
    });

    db.collection("products").add({
      name: 'Shirt 1',
      productId: '00004',
      categories: {
        1: 'Unisex',
        2: 'Tops',
        3: 'Shirts'
      },
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/450/FC0FC0/000000',
          price: "12.99",
          color: {
            string: 'color 1',
            value: '#fc0fc0'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/450/00FFD8/000000',
          price: "13.99",
          color: {
            string: 'color 2',
            value: '#00ffd8'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/450/FFCC00/000000',
          price: "14.99",
          color: {
            string: 'color 3',
            value: '#ffcc00'
          }
        }
      ]
    });

    db.collection("products").add({
      name: 'Shirt 2',
      productId: '00005',
      categories: {
        1: 'Unisex',
        2: 'Tops',
        3: 'Shirts'
      },
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/450/FC0FC0/000000',
          price: "12.99",
          color: {
            string: 'color 1',
            value: '#fc0fc0'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/450/00FFD8/000000',
          price: "13.99",
          color: {
            string: 'color 2',
            value: '#00ffd8'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/450/FFCC00/000000',
          price: "14.99",
          color: {
            string: 'color 3',
            value: '#ffcc00'
          }
        }
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <TopBar></TopBar>
        </header>
        <section id="items">
          <div id="product-container">
            { this.state && this.state.products && Object.keys(this.state.products[0]).length !== 0 && this.state.products.map((product, i) =>
              <div className="item" key={i}>
                <ProductCard product={product}></ProductCard>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
