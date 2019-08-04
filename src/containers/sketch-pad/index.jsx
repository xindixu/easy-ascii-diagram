import React, { Component } from 'react';
import PropTypes from 'prop-types';
import draw from '../../utlis/draw';
import {
  GRID_WIDTH, GRID_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, DIRECTION, TOOLS,
} from '../../constants';

import Grid from '../../components/grid';
import ToolBar from '../toolbar';
import { Canvas } from './style';


class SketchPad extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();

    this.state = {
      zoomLevel: 1,
      isDrawing: false,
      content: [],
      tool: '',
      prevPos: { x: null, y: null },
      curPos: { x: null, y: null },
    };
  }


  componentDidMount() {
    const ctx = this.canvas.current.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    draw(ctx, TOOLS.rectangle, {
      x: 2, y: 2, width: 4, height: 5,
    });
    draw(ctx, TOOLS.line, {
      x: 10, y: 3, length: 5, direction: DIRECTION.vertical,
    });
    console.log(ctx);
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
    const { prevPos, curPos } = this.state;
    return (
      <React.Fragment>
        <ToolBar />
        <Grid
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
        <Canvas ref={this.canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />

      </React.Fragment>

    );
  }
}

SketchPad.propTypes = {
};

export default SketchPad;
