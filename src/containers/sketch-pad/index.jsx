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
  };


  componentDidMount() {

  }

  setDrawingTool = (e) => {
    this.setState({ tool: e.target.value });
  }

  setZoomLevel = (zoom) => {
    this.setState({ zoomLevel: zoom });
  }

  render() {
    const { tool, zoomLevel } = this.state;
    return (
      <React.Fragment>
        <ToolBar setTool={this.setDrawingTool} setZoom={this.setZoomLevel} currentTool={tool} currentZoom={zoomLevel} />
        <Grid zoomLevel={zoomLevel} />
        <Diagram
          tool={tool}
          zoomLevel={zoomLevel}
        />
      </React.Fragment>

    );
  }
}

SketchPad.propTypes = {
};

export default SketchPad;
