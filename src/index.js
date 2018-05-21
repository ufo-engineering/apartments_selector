import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Areas from './components/Areas.jsx';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import storeApp from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

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
			<div className="container">
				<Route path="/" exact component={App}/>
				<Route path="/project/:id" component={App}/>
				<Route path="/areas/:id" component={Areas}/>
				<Route path="/buildings/:id" component={App}/>
			</div>
		</Router>
	</Provider> , document.getElementById('root'));
