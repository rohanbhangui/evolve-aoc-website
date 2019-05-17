import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { ProductCard } from '../product-search-card/product-search-card';

import logo from '../../assets/images/logo.svg';
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

        
        // console.log("DEBUG", querySnapshot.docs);
        let products = querySnapshot.docs.map( (item, index) => item.data()).sort((a,b) => (a.productId > b.productId) ? 1 : ((b.productId > a.productId) ? -1 : 0));

        component.setState({
          products,
          selectedVariantIndex: 0
        });

        // console.log("DEBUG", products);
    });


  }

  addData(e) {
    debugger;

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
          image: 'https://via.placeholder.com/350/FF0000/000000',
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/350/00FF00/000000',
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/350/0000FF/000000',
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
          image: 'https://via.placeholder.com/350/FF0000/000000',
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/350/00FF00/000000',
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/350/0000FF/000000',
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
          image: 'https://via.placeholder.com/350/FF0000/000000',
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/350/00FF00/000000',
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/350/0000FF/000000',
          color: {
            string: 'blue',
            value: '#0000ff'
          }
        }
      ]
    });
  }

  render() {
    return (
      <div className="App">
        
        { /*

        for adding data <button className="addData" onClick={ this.addData }>add data</button> 
        <section id="header">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </div>
        </section> */}
        <section id="items">
          { this.state && this.state.products.map((product, i) =>
            <div className="item" key={i}>
              <ProductCard product={product}></ProductCard>
            </div>

          )}
        </section>
      </div>
    );
  }
}

export default App;
