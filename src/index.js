import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App.jsx';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import storeApp from './reducers';



let store = createStore(
	storeApp,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

// store.subscribe(() => {
//   console.log(store.getState());
// });


ReactDOM.render( 
	<Provider store={store}>
		<App />
	</Provider> , document.getElementById('root'));

