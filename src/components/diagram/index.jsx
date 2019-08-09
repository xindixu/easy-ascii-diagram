import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './style';
import {
  DIRECTION, TOOLS, TOOLS_DRAWING,
  GRID_WIDTH, GRID_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, DIRECTION_ARROW,
} from '../../constants';

import Rectangle from '../../lib/rectangle';
import Line from '../../lib/line';
import Arrow from '../../lib/arrow';
import Text from '../../lib/text';

class Diagram extends Component {
  state = {
    isDrawing: false,
    prevPos: null,
    curPos: null,
    content: [],
  }

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
    const { zoomLevel } = this.props;
    const { curPos } = this.state;
    const { x, y } = curPos;

    const column = Math.floor(x / GRID_WIDTH / zoomLevel);
    const row = Math.floor(y / GRID_HEIGHT / zoomLevel) - 2;
    return { column, row };
    // const { _, totalColumn } = this.calculateTotalGridNumber();
    // const index = row * totalColumn + column;
    // return index;
  }

  calculateTotalGridNumber() {
    const { zoomLevel } = this.props;
    const totalRow = Math.floor(CANVAS_HEIGHT / zoomLevel);
    const totalColumn = Math.floor(CANVAS_WIDTH / zoomLevel);
    return { totalRow, totalColumn };
  }


  draw() {
    const { column, row } = this.calculateGridToFill();
    const { tool } = this.props;
    console.log(`${tool} (${column}, ${row})`);

    switch (tool) {
      case TOOLS.rectangle:
        break;
      case TOOLS.arrow:
        break;
      default:
        break;
    }
  }


  render() {
    const { content } = this.state;

    return (
      <Wrapper
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <Text x={10} y={3} content="xindi loves justin" />
        <Line x={25} y={10} length={21} direction={DIRECTION.horizontal} />
        <Arrow x={25} y={10} length={21} direction={DIRECTION.up} />
        <Rectangle x={1} y={2} width={12} height={12} />
      </Wrapper>
    );
  }
}

Diagram.defaultProps = {
  zoomLevel: 1,
};
Diagram.propTypes = {
  tool: PropTypes.oneOf([...Object.values(TOOLS)]).isRequired,
  zoomLevel: PropTypes.number,
};

export default Diagram;
