import React, { PureComponent } from 'react';
import '../css/Filter.css';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import {actFirst,actSec} from '../actions/actions.js';
// import {Link } from 'react-router-dom'


class Filter extends PureComponent {
  constructor(props) {
		super(props)
    this.state = {
      project: this.props.project || {}
    }
		this.handleClose = this.handleClose.bind(this);
	}

  componentWillReceiveProps(newProps){
    this.setState({
      project: newProps.project
    })
  }
  handleClose(){
    console.log('ewew')
    this.props.closeEvent()
  }
  render(){
    return(
      <div className="filter-component">
        <div className="filter-head">
          <h3>{this.state.project.contain}</h3>
          <button
            className="filter-closer"
            onClick={this.handleClose}
            ><i/></button>
        </div>
        <div className="filter-table">
          <div className="row thead">
              <div className="col-4">ID</div>
              <div className="col-4">Area (m2)</div>
              <div className="col-4">Price (€)</div>
          </div>

          {this.state.project&&this.state.project.values&&
          Object.keys(this.state.project.values).map((key, id)=>{
              return(
                <div key={id} className="row">
                  <div className="col-4">{key}</div>
                  <div className="col-4">{this.state.project.values[key].area}</div>
                  <div className="col-4">{this.state.project.values[key].price}</div>
                </div>
              )
            })

        }
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    project: state.projectData.dataObj,
  }
};
function mapDispatchToProps(dispatch,ownProps) {
  return {
    // actFirst: bindActionCreators(actFirst, dispatch),
    // actSec: bindActionCreators(actSec, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
