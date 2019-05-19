import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import evolveApp from './redux/reducers/reducers';

const store = window.store = createStore(
	evolveApp,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
    	<App />
 	</Provider>,
 	document.getElementById('root')
);