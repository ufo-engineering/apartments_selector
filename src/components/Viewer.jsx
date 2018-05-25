import React, { Component } from 'react'
import Paper from './Paper/Paper'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'





class Viewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      imagePath : this.props.imagePath || ''
    }
    this._box = null
    this._request = null

    this.redirectEvent = this.redirectEvent.bind(this);

  }

  resizeWindow = () => {
    if (!this._request) {
      this._request = requestAnimationFrame(this.resizePaper)
    }
  }

  resizePaper = () => {
    this.forceUpdate()
    this._request = null
  }

  setImageSize = ({ size }) => {
    this.setState({ imageSize: size })
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      values: this.props.maskValues
     })
    // window.addEventListener('resize', this.resizeWindow)
  }
  redirectEvent(id){
    this.props.chooseEvent([this.props.daughters,id])
  }
  componentWillUnmount() {
    if (this._request) {
      cancelAnimationFrame(this._request)
      this._request = null
    }
    // window.removeEventListener('resize', this.resizeWindow)
  }
  render() {
    const {  mounted } = this.state
    const box = this._box && this._box.getBoundingClientRect()

    return (
      <div className="Viewer-component" ref={ref => this._box = ref}>
        {mounted &&
          <Paper
            available_width={box}
            values={this.state.values}
            selectMask={this.redirectEvent}
            image={this.state.imagePath}
          />}
      </div>
    )
  }

}
function mapStateToProps(state){
	return {
    imagePath: state.projectData.dataObj.imagePath,
    maskValues: state.projectData.dataObj.values,
		daughters: state.projectData.dataObj.contain
	}
};
export default connect(
  mapStateToProps
)(Viewer)
