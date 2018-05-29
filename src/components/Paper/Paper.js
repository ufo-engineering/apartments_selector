import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import pick from 'lodash.pick'

import {
  Layer, Raster, View,
  Circle, Path, Rectangle,
} from 'react-paper-bindings'

import Loader from '../Loader.jsx'


class Paper extends Component {

  static propTypes = {
    image: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false,
      loaded: false,
      showLayers: true,
      childArr: [],
      showWithStatus: this.props.showOnlyStatus || null,
      hoverArea: {},
      showPin: false,
      sx: 0, // scale center x
      sy: 0, // scale center y
      tx: 0, // translate x
      ty: 0, // translate y
      x: 0,
      y: 0,
      zoom: 1,
    }
    this._view = null

    this.handleClick = this.handleClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.childrenCreate = this.childrenCreate.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
		this.visibleOrNot = this.visibleOrNot.bind(this);

  }
  componentWillReceiveProps(newProps){
    if(newProps.showOnlyStatus != this.state.showWithStatus){
      console.log(newProps.showOnlyStatus, this.state.showWithStatus)
      this.setState({showWithStatus: newProps.showOnlyStatus})

    }
  }
  fitImage(image){
     let imageWidth = image.width,
          imageHeight = image.height,
          width = this.props.available_width.width,
          coeff = image.width/image.height,
          height = parseInt(width/coeff);
     if (this.state.imageLoaded) {
       return
     }
     const wr = width / imageWidth
     const hr = height / imageHeight
     const zoom = wr < hr ? wr : hr
     const iw = imageWidth * zoom
     const ih = imageHeight * zoom

     this._view.paper.view.setCenter(0,0)

     image.fitBounds(-width/2/zoom,-height/2/zoom, imageWidth, imageHeight)
     const tx = (width-iw) / 2 / zoom
     const ty = (height-ih) / 2 / zoom
     const x = this.state.x + tx
     const y = this.state.y + ty
     this.setState({ tx, ty, x, y, zoom, width, height, imageLoaded :true})
   }

  imageLoaded(image){
    this.fitImage(image)
    this.setState({
      imageLoaded: true,
      loaded: true
    })
  }
  colorDetecter(val){
    if(val=== 1 ){
      return 'rgba(167, 195, 103, .5)'; //free
    }else if(val=== 2){
      return 'rgba(232, 104, 2,.4)' //booked
    }else{
      return 'rgba(214, 218, 224,.6)' //sold
    }
  }
  visibleOrNot(status){
    if( this.state.showWithStatus == status){
      return 1
    }else{
      return 0
    }
  }
  childrenCreate(values){
    let childArr = [];
    if (Object.values(values).length === 0) return;
    for(let key in values){

      let color = this.colorDetecter(parseInt(values[key]['status'])),
          status = values[key]['status'];
      childArr.push({
          "id": key,
          "bookStatus": status,
          "type": "Path",
          "fillColor": color,
          "closed": true,
          "opacity":  this.visibleOrNot(status),
          "strokeWidth": 0,
          "pathData": values[key]['mask_coords'][0]
        })
    }
    return childArr
  }
  componentWillUpdate(nextProps) {
    const { image } = this.props
    if (image !== nextProps.image) {
      this.setState({ imageLoaded: false })
    }
  }
  componentDidMount(){

    this.setState({showStatus: this.props.showOnlyStatus})
  }
  handleClick(e){
    this.props.selectMask(e.target.data.id)
  }
  handleEnter(e){
   e.target.opacity = 1
   this.setState({
     showPin: true,
     hoverArea: this.props.valuesObj[e.target.data.id]
   })
   document.body.style.cursor = "pointer";
  }
  handleLeave(e){
    e.target.opacity = this.visibleOrNot(e.target.bookStatus)
    this.setState({
      showPin: false
    })
        document.body.style.cursor = "default";
  }
  handleMouseMove(e){
    let pinHeight = this.refs.pin.getBoundingClientRect().height;
    this.refs.pin.style.left = e.event.clientX +'px';
    this.refs.pin.style.top = e.event.clientY-(pinHeight/2) +'px';

  }
  render() {
    console.log('asdasd')
    const {
      activeTool,activeLayer, image, initialData, selectedItem
    } = this.props

    const { loaded, imageLoaded, width, height } = this.state
    const layerProps = {
      initialData,
      activeLayer,
      selectedItem,
      selectItem: this.props.selectItem,
    }
    const viewProps = Object.assign({} ,this.props,{
      ref: ref => this._view = ref,
      onWheel: this.props.moveToolMouseWheel,
      activeTool: 'select',
      width: this.state.width || 150,
      height: this.state.height || 150,
      matrix: {
        'sx': this.state.sx,
        'sy': this.state.sy,
        'tx': this.state.tx,
        'ty': this.state.ty,
        'x': this.state.x,
        'y': this.state.y,
        'zoom': this.state.zoom}
    })
    return (
      <div className="viewr-wrp">
      {!imageLoaded && <Loader/> }
      <View {...viewProps}>
        <Layer>
          <Raster locked source={image} onLoad={this.imageLoaded} />
        </Layer>
        <Layer
          data={{type: "Layer"}}>
          {this.childrenCreate(this.props.valuesObj).map(({
            id: itemId,
            type: Item,
            ...props
          }) =>
          <Item
            key={itemId}
            id={itemId}
            {...props}
            onMouseDown={this.handleClick}
            onMouseEnter={this.handleEnter}
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleLeave}
            data={{id: itemId, type: Item}}
          />
        )}
          </Layer>
        </View>

        <div ref="pin"  className={`pin-info ${this.state.showPin && 'show'}`}>
          <h3>{this.state.hoverArea.name}</h3>
          <div className="total-info desc">
            <span>Buildings</span><b>{this.state.hoverArea.total_quantity}</b>
          </div>
          <div className="free-info desc">
          <span>Free</span><b>{this.state.hoverArea.available_quantity}</b>
          </div>
          <div className="booked-info desc">
          <span>Booked</span><b>{this.state.hoverArea.booked_quantity}</b>
          </div>
          <div className="sold-info desc">
          <span>Sold</span><b>{this.state.hoverArea.sold_quantity}</b>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
	return {
		valuesObj: state.projectData.dataObj.values,
    image: state.projectData.dataObj.imagePath,
    showOnlyStatus: state.filterData.statusFilter
	}
};
export default connect(
  mapStateToProps
)(Paper)
