import React, { PureComponent } from 'react';
import '../css/header.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {statusFilter} from '../actions/actions.js';


class Header extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      project: this.props.project || {},
      history: this.props.pager.history || []
    }
    this.handleBack= this.handleBack.bind(this);
    this.activeFilterBtn= this.activeFilterBtn.bind(this);
    this.statusFilterOut= this.statusFilterOut.bind(this);
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
  statusFilterOut(e){
    if(e.currentTarget.value === this.props.showOnlyStatus){
      this.props.statusFilter(null);
      return
    }
    this.props.statusFilter(e.currentTarget.value)
  }
  activeFilterBtn(val){
    if(this.props.showOnlyStatus === val) return 'active';
  }
  render() {
    let history = this.state.history,
        pageType =  this.props.pager.currentPage[0] || 'project';
        // console.log(this.props.showOnlyStatus);

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
            Remaining free: {this.state.project.available}
          </span>
        </div>
      </div>
      :
      <div className="row active-header">
        <div className="col-9">
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
            Remaining free: {this.state.project.available}
          </span>
        </div>
        <div className="col-3">
          <div className="status-filter">
            <button
              className={`status-btn free-btn ${
                this.activeFilterBtn(1)
              }`}
              onClick={this.statusFilterOut}
              value="1">Free</button>
            <button
              className={`status-btn booked-btn ${
                this.activeFilterBtn(2)
              }`}
              onClick={this.statusFilterOut}
              value="2">Booked</button>
            <button
              className={`status-btn sold-btn ${
                this.activeFilterBtn(0)
              }`}
              onClick={this.statusFilterOut}
              value="0">Sold</button>
          </div>
        </div>

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
    showOnlyStatus: state.filterData.statusFilter
  }
};
function mapDispatchToProps(dispatch,ownProps) {
  return {
    statusFilter: bindActionCreators(statusFilter, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
