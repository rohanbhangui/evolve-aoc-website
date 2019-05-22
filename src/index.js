import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import evolveApp from './redux/reducers/reducers';

import App from './pages/app/app';
import './index.scss';

const store = window.store = createStore(
	evolveApp,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(<App store={store} />, document.getElementById('root'))