import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


import logo from '../../assets/images/logo.svg';
import './app.css';

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
  }
  componentDidMount() {
  }

  addData(e) {
    debugger;

    db.collection("products").add({
      name: 'Hoodie 1',
      productId: '00001',
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/350/FF0000/808080',
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/350/00FF00/808080',
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/350/0000FF/808080',
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
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/350/FF0000/808080',
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/350/00FF00/808080',
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/350/0000FF/808080',
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
      variants: [
        {
          variantId: '00001',
          image: 'https://via.placeholder.com/350/FF0000/808080',
          color: {
            string: 'red',
            value: '#ff0000'
          }
        },
        {
          variantId: '00002',
          image: 'https://via.placeholder.com/350/00FF00/808080',
          color: {
            string: 'green',
            value: '#00ff00'
          }
        },
        {
          variantId: '00003',
          image: 'https://via.placeholder.com/350/0000FF/808080',
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
        { /* for adding data <button className="addData" onClick={ this.addData }>add data</button> */ } 
        <header className="App-header">
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
        </header>
      </div>
    );
  }
}

export default App;
