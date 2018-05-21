		import React, { PureComponent } from 'react';
		import '../css/App.css';
		
		import { connect } from 'react-redux'
		import { bindActionCreators } from 'redux'
		import {actFirst,actSec} from '../actions/actions.js';
		
		
		
		class App extends PureComponent {
		
			constructor(props) {
				super(props)
				this.state = {
					test: this.props.test
				}
				this.handleClick1= this.handleClick1.bind(this);
				this.handleClick2= this.handleClick2.bind(this);
			}
			componentWillReceiveProps(newProps){
				this.setState({test: newProps.test})
			}
			handleClick1(e){
				e.preventDefault();
				this.props.actFirst('first')
			}
			handleClick2(e){
				e.preventDefault();
				this.props.actSec('scond')
			}	
			render() {
				console.log(this.props.match.params.id)
			  return (
				<div className="App">
				<ul>
					<li>{this.state.test}</li>
					<li>{this.props.test}</li>	
				</ul>				
					<button onClick={this.handleClick1}>test1</button>	
					<button onClick={this.handleClick2}>test2</button>	
				</div>
			  );
			}
		}
		
		function mapStateToProps(state){
			return {
				test: state.firstRedus.test   	
			}
		};
		function mapDispatchToProps(dispatch,ownProps) {
			return {
				actFirst: bindActionCreators(actFirst, dispatch),
				actSec: bindActionCreators(actSec, dispatch)		
			}
		};
		
		export default connect(
		  mapStateToProps,
		  mapDispatchToProps
		)(App);		