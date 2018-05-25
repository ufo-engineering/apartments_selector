import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import storeApp from './reducers';

import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';


import App from './components/App.jsx';
import Areas from './components/Areas.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

let store = createStore(
	storeApp,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div className="container">
				<Route path="/" exact component={App}/>
				<Route path="/project/:id" component={App}/>
				<Route path="/areas/:id" component={App}/>
				<Route path="/buildings/:id" component={App}/>
				<Route path="/apartments/:id" component={App}/>
			</div>
		</Router>
	</Provider> , document.getElementById('root'));
