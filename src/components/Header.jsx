import React, { PureComponent } from 'react';
import '../css/header.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {removeLatestFromHistory} from '../actions/actions.js';
import {Link, History } from 'react-router-dom'


class Header extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      project: this.props.project || {},
      history: this.props.pager.history || []
    }
    this.handleBack= this.handleBack.bind(this);
  }
  componentDidMount(){
  }
  componentWillReceiveProps(newProps){
    this.setState({
      project: newProps.project,
      pageData: newProps.pager || []
    })
  }
  handleBack(){
    this.props.historyBack()
  }
  render() {
    let history = this.state.history,
        pageType =  this.props.pager.currentPage[0] || 'project';
    return (
    <div className="header-component">
    {pageType === 'project' ?
      <div className="row project-header">
        <div className="col-md-12">
        <h2>
           {this.state.project.name}
        </h2>
        </div>
        <div className="col-md-6 left">
          <span>
            Buildings: {this.state.project.total}
          </span>
        </div>
        <div className="col-md-6 right">
          <span>
            Remaining free: {this.state.project.free}
          </span>
        </div>
      </div>
      :
      <div className="row active-header">

        {history.length > 0  &&
          <button className="go-btn"
          onClick={this.handleBack}>« Back</button>
        }

        <h2>{this.state.project.name}</h2>
        <i className="delimiter" />
        <span>
          Buildings: {this.state.project.total}
        </span>
        <i className="delimiter" />
        <span>
          Remaining free: {this.state.project.free}
        </span>
      </div>
      }
    </div>
    );
  }
}

function mapStateToProps(state){
  return {
    project: state.projectData.dataObj,
    pager: state.pagerData,
  }
};
function mapDispatchToProps(dispatch,ownProps) {
  return {
    // goBack: bindActionCreators(removeLatestFromHistory, dispatch),
    // actSec: bindActionCreators(actSec, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
