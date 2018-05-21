	import React, { PureComponent } from 'react';
	import '../css/App.css';

	import { connect } from 'react-redux'
	import { bindActionCreators } from 'redux'
	import {actFirst,actSec} from '../actions/actions.js';



	class App extends PureComponent {

		// constructor(props) {
		// 	super(props)
		// 	this.state = {
		// 		test: this.props.test
		// 	}
		// 	this.handleClick1= this.handleClick1.bind(this);
		// 	this.handleClick2= this.handleClick2.bind(this);
		// }
		componentWillMount(){
			this.setState({test: 'aaaa'})
		}
		componentWillReceiveProps(ae){
				console.log(ae)
		}
		handleClick1(e){
			e.preventDefault();
			this.props.actFirst('azazazzazaz')
		}
		handleClick2(e){
			e.preventDefault();
			this.props.actSec('olololo')
		}	
		render() {
		  return (
			<div className="App">
			<ul>
					<li>
			{this.state.test}
					</li>

					<li>
			{this.props.test}
					</li>	
			</ul>				
				<button onClick={(e)=>this.handleClick1(e)}>asd1</button>	
				<button onClick={(e)=>this.handleClick2(e)}>asd2</button>	
			</div>
		  );
		}
	}

	function mapStateToProps(state){
		return {
			test: state.test		
		}
	};

	function mapDispatchToProps(dispatch) {
	  return {
	    actFirst: bindActionCreators(actFirst, dispatch),
	    actSec: bindActionCreators(actSec, dispatch)
	  }
	}

const con = connect(mapStateToProps, mapDispatchToProps)(App);

export default con;