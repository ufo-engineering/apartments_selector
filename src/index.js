import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App.jsx';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
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
		<Router>
			<div>
			<Route path="/" exact component={App}/>
			<Route path="/project/:id" component={App}/>
			</div>
		</Router>
	</Provider> , document.getElementById('root'));

