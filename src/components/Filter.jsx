import React, { PureComponent } from 'react';
import '../css/Filter.css';

import { connect } from 'react-redux'


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
          <div className="row filter-thead">
              <div className="col-4">ID</div>
              <div className="col-4">Area (m2)</div>
              <div className="col-4">Price (€)</div>
          </div>

          <div className="filter-tbody">
            {this.state.project&&this.state.project.values&&
            Object.keys(this.state.project.values).map((key, id)=>{
              let item = this.state.project.values[key];
                return(
                  <div key={id}
                  className={`row ${item.status === 0 ?
                    'sold' :  item.status === 2 ? 'booked' : ''
                  }`}>
                    <div className="col-4">{item.name}</div>
                    <div className="col-4">{item.area}</div>
                    <div className="col-4">{item.price}</div>
                  </div>
                )
              })

          }
          </div>
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
