import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import evolveApp from './redux/reducers/reducers';
import { loadCart, saveCart } from './utility/localStorage';

import App from './pages/app/app';
import './index.scss';

const persistedCart = loadCart();

const store = window.store = createStore(
	evolveApp,
	persistedCart,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
	saveCart({
		cart: store.getState().cart
	});
});

render(<App store={store} />, document.getElementById('root'))