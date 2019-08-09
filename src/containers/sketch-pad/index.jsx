import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  GRID_WIDTH, GRID_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, DIRECTION, TOOLS,
} from '../../constants';

import Grid from '../../components/grid';
import Diagram from '../../components/diagram';
import ToolBar from '../toolbar';

import draw from '../../utlis/draw';


class SketchPad extends Component {
  state = {
    zoomLevel: 1,
    isDrawing: false,
    content: [],
    tool: '',
    prevPos: { x: null, y: null },
    curPos: { x: null, y: null },
  };


  componentDidMount() {

  }


  handleMouseDown = (e) => {
    this.setState({
      isDrawing: true,
      prevPos: { x: e.clientX, y: e.clientY },
      curPos: { x: e.clientX, y: e.clientY },
    });
  }

  handleMouseMove = (e) => {
    if (this.state.isDrawing === true) {
      this.setState({
        curPos: { x: e.clientX, y: e.clientY },
      });
      this.draw();
    }
  }

  handleMouseUp = (e) => {
    this.setState({
      isDrawing: false,
    });
  }


  calculateGridToFill() {
    const { curPos, zoomLevel } = this.state;
    const { x, y } = curPos;

    const column = Math.floor(x / GRID_WIDTH / zoomLevel);
    const row = Math.floor(y / GRID_HEIGHT / zoomLevel) - 1;

    const { _, totalColumn } = this.calculateTotalGridNumber();
    const index = row * totalColumn + column;
    return index;
  }

  calculateTotalGridNumber() {
    const { zoomLevel } = this.state;
    const totalRow = Math.floor(CANVAS_HEIGHT / zoomLevel);
    const totalColumn = Math.floor(CANVAS_WIDTH / zoomLevel);
    return { totalRow, totalColumn };
  }


  draw() {
    const index = this.calculateGridToFill();
    console.log(index);
  }

  render() {
    const { prevPos, curPos, zoomLevel } = this.state;
    return (
      <React.Fragment>
        <ToolBar />
        <Grid zoomLevel={zoomLevel} />
        <Diagram
          handleMouseDown={this.handleMouseDown}
          handleMouseMove={this.handleMouseMove}
          handleMouseUp={this.handleMouseUp}
        />
      </React.Fragment>

    );
  }
}

SketchPad.propTypes = {
};

export default SketchPad;
