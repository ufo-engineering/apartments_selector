import React, { PureComponent } from 'react';
import '../css/header.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {actFirst,actSec} from '../actions/actions.js';
import {Link } from 'react-router-dom'


class Header extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      // test: this.props.test
    }
    // this.handleClick1= this.handleClick1.bind(this);
  }
  componentDidMount(){

  }
  componentWillReceiveProps(newProps){

  }
  render() {
    return (
    <header className="header-component">
asdasdasd
    </header>
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
)(Header);
