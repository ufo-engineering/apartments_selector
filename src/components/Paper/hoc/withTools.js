import React, { Component } from 'react'

export default function withTools(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this.state = {
        activeTool: 'select',
      }
      this._prevTool = null
    }

    setTool = (activeTool) => {
      this.setState({ activeTool })
    }


    render() {
      return (
        <WrappedComponent
          {...this.props}
          activeTool={this.state.activeTool}
        />
      )
    }

  }

}
