import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GRID_WIDTH, GRID_HEIGHT } from '../../constants';
import Grid from '../../component/grid';
import ToolBar from '../toolbar';


const userStrokeStyle = '#EE92C2';
const guestStrokeStyle = '#F0C987';

class SketchPad extends Component {
  state = {
    zoomLevel: 1,
    isDrawing: false,
    content: [],
    tool: '',
    prevPos: { x: null, y: null },
    curPos: { x: null, y: null },
  };


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

    const column = x / GRID_WIDTH * zoomLevel;
    const row = y / GRID_HEIGHT * zoomLevel;
    console.log(column, row);
    const { _, totalColumn } = this.calculateTotalGridNumber();
    const index = row * totalColumn + column;
    return index;
  }

  calculateTotalGridNumber() {
    const { zoomLevel } = this.state;
    const totalRow = window.height / GRID_HEIGHT * zoomLevel;
    const totalColumn = window.width / GRID_WIDTH * zoomLevel;
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
      </React.Fragment>

    );
  }
}

SketchPad.propTypes = {

};

export default SketchPad;
