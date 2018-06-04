import React, { PureComponent } from 'react';
import '../../css/Pin.css';

import { connect } from 'react-redux'

class Pin extends PureComponent {
  constructor(props) {
		super(props)
		this.state = {
      hoverInfo: this.props.hoverInfo || {}
		}
  }
  componentWillReceiveProps(newProps){
    if(newProps.hoverInfo.name !== this.state.hoverInfo.name){
      this.setState({hoverInfo: newProps.hoverInfo})
    }
  }
  render(){
    return (
      <div className={this.props.pager.currentPage[0]}>
        <h3>{this.state.hoverInfo.name}</h3>
        {this.props.pager.currentPage[0] !== 'project' ?
        <div>
          <div className="total-info desc">
            <span>Buildings</span><b>{this.state.hoverInfo.total}</b>
          </div>
          <div className="free-info desc">
          <span>Free</span><b>{this.state.hoverInfo.available}</b>
          </div>
          <div className="booked-info desc">
          <span>Booked</span><b></b>
          </div>
          <div className="sold-info desc">
          <span>Sold</span><b></b>
          </div>
        </div>
        :
        <div>
          <div className="total-info desc">
            <span>Buildings</span><b>{this.state.hoverInfo.total}</b>
          </div>
          <div className="free-info desc">
          <span>Free</span><b>{this.state.hoverInfo.available}</b>
          </div>
        </div>

      }

      </div>

    )
  }

}

function mapStateToProps(state){
  return {
    pager: state.pagerData,
  }
};

export default connect(
  mapStateToProps
)(Pin);
