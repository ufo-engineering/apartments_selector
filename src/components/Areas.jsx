import React, { PureComponent } from 'react';
import '../css/App.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {actFirst,actSec} from '../actions/actions.js';
import {Link } from 'react-router-dom'


class Areas extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      test: this.props.test
    }
    this.handleClick1= this.handleClick1.bind(this);
    this.handleClick2= this.handleClick2.bind(this);
  }
  componentDidMount(){
      console.log(this.props.match.params.id)
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
    console.log()
    return (
    <div className="App">
    <h1>{this.props.match.params.id}</h1>
    <ul>
      <li>{this.state.test}</li>
      <li>{this.props.test}</li>
    </ul>
      <button onClick={this.handleClick1}>test1</button>
      <button onClick={this.handleClick2}>test2</button>

      <Link to="/project/1444">dasd</Link>
      <br/>
      <Link to="/">dasdqwesd</Link>
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
)(Areas);
