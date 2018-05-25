import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
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
      sx: 500, // scale center x
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
  }




  fitImage(image){
     // const { imageWidth, imageHeight, width, height } = this.props
     let imageWidth = image.width,
          imageHeight = image.height,
          width = this.props.available_width.width,
          coeff = image.width/image.height,
          height = width/coeff;
     // fit raster into original image size
     image.fitBounds(width, 0, imageWidth, imageHeight)
     // if image is already loaded
     // do not attempt to fit it again
     if (this._imageLoaded) {
       return
     }
     // calculate zoom
     const wr = width / imageWidth
     const hr = height / imageHeight
     const zoom = wr < hr ? wr : hr
     image.fitBounds(-700, 0, imageWidth, imageHeight)
     // calculate new image size
     const iw = imageWidth * zoom
     const ih = imageHeight * zoom
     // calculate needed translation xy
     const tx = (width-iw) / 2 / zoom
     const ty = (height-ih) / 2 / zoom
     // calculate center xy
     const x = this.state.x + tx
     const y = this.state.y + ty
     // center the image in the middle
     this.setState({ tx, ty, x, y, zoom, width, height }, () => {
       // TODO: try to find a better solution
       // reset translation xy to prevent zoom problems
       // this.setState({ tx: 0, ty: 0 })
     })
     // set image loaded
     this._imageLoaded = true
   }

  imageLoaded(image){
    this.fitImage(image)
    this.setState({
      imageLoaded: true,
      loaded: true
    })
  }
  childrenCreate(values){
    let childArr = [];
    if (Object.values(values).length === 0) return;
    for(let key in values){
      let color = parseInt(values[key]['status']) === 1 ? 'rgba(0,255,0,0.4)': 'rgba(255,0,0,0.4)'
      childArr.push({
          "id": key,
          "bookStatus": values[key]['status'],
          "type": "Path",
          "fillColor": color,
          "closed": true,
          "opacity": 0,
          "strokeWidth": 0,
          "pathData": values[key]['mask_coords'][0]
        })
    }
    this.setState({childArr: childArr})
  }
  componentWillUpdate(nextProps) {
    const { image } = this.props
    if (image !== nextProps.image) {
      this.setState({ imageLoaded: false })
    }
  }
  componentDidMount(){
    this.childrenCreate(this.props.values)
  }
  handleClick(e){
    this.props.selectMask(e.target.data.id)
  }
  handleEnter(e){
   e.target.opacity = 1
  }
  handleLeave(e){
    e.target.opacity = 0
  }
  render() {
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
          {this.state.childArr.map(({ id: itemId, type: Item, ...props }) =>
          <Item
            key={itemId}
            id={itemId}
            {...props}
            onMouseDown={this.handleClick}
            onMouseEnter={this.handleEnter}
            onMouseLeave={this.handleLeave}
            data={{id: itemId, type: Item, ololo: '2'}}
          />
        )}
          </Layer>
        </View>




      </div>
    )
  }
}

export default compose(
)(Paper)
