import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TOOLS } from '../../constants';

import Grid from '../../components/grid';
import Diagram from '../../components/diagram';
import ToolBar from '../toolbar';

class SketchPad extends Component {
  state = {
    zoomLevel: 1,
    tool: TOOLS.arrow,
    content: [],
    future: [],
  };


  componentDidMount() {

  }

  setDrawingTool = (e) => {
    this.setState({ tool: e.target.value });
  }

  setZoomLevel = (zoom) => {
    this.setState({ zoomLevel: zoom });
  }


  commitDrawing = (shape) => {
    const { content } = this.state;
    this.setState({
      content: [...content, shape],
    });
  }

  render() {
    const { tool, zoomLevel, content } = this.state;
    return (
      <React.Fragment>
        <ToolBar
          setTool={this.setDrawingTool}
          setZoom={this.setZoomLevel}
          currentTool={tool}
          currentZoom={zoomLevel}
          content={this.content}
          future={this.future}
        />
        <Grid zoomLevel={zoomLevel} />
        <Diagram
          tool={tool}
          zoomLevel={zoomLevel}
          content={content}
          commitDrawing={this.commitDrawing}
        />
      </React.Fragment>

    );
  }
}

SketchPad.propTypes = {
};

export default SketchPad;
