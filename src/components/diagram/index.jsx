import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Wrapper } from './style';
import {
  DIRECTION, TOOLS, TOOLS_DRAWING,
  GRID_WIDTH, GRID_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, DIRECTION_ARROW, DIRECTION_LINE,
} from '../../constants';

import Rectangle from '../../lib/rectangle';
import Line from '../../lib/line';
import Arrow from '../../lib/arrow';
import Text from '../../lib/text';

const randomId = () => Date.now() / 10000 + Math.random().toFixed(4);
class Diagram extends Component {
  state = {
    isDrawing: false,
    start: null,
    end: null,
    drawing: null,
    content: [
      <Rectangle key={randomId()} x={1} y={2} width={13} height={14} />,
      <Text key={randomId()} x={1} y={2} content="hahah" />,
      <Line key={randomId()} x={20} y={2} length={10} direction={DIRECTION_LINE.vertical} />,
      <Arrow key={randomId()} x={24} y={2} length={10} direction={DIRECTION_ARROW.up} />,
    ],
  }

  componentDidMount() {

  }

  handleMouseDown = (e) => {
    this.setState({
      isDrawing: true,
      start: { x: e.clientX, y: e.clientY },
      end: { x: e.clientX, y: e.clientY },

    });
  }

  handleMouseMove = (e) => {
    console.log('handling move');
    if (this.state.isDrawing === true) {
      this.setState({
        end: { x: e.clientX, y: e.clientY },
      });
      this.draw();
    }
  }

  handleMouseUp = (e) => {
    const shape = this.state.drawing;
    if (shape !== null) {
      this.setState(state => ({
        content: state.content.concat(shape),
        drawing: null,
      }));
    }
    this.setState({
      isDrawing: false,
      end: { x: e.clientX, y: e.clientY },
    });
  }

  getX = x => Math.floor(x / GRID_WIDTH / this.props.zoomLevel);

  getY = y => Math.floor(y / GRID_HEIGHT / this.props.zoomLevel) - 1;


  calculateTotalGridNumber() {
    const { zoomLevel } = this.props;
    const totalRow = Math.floor(CANVAS_HEIGHT / zoomLevel);
    const totalColumn = Math.floor(CANVAS_WIDTH / zoomLevel);
    return { totalRow, totalColumn };
  }


  drawArrow() {
    const { start, end } = this.state;
    const x = start.x < end.x ? this.getX(start.x) : this.getX(end.x);
    const y = start.y < end.y ? this.getY(start.y) : this.getY(end.y);
    const width = Math.abs(this.getX(start.x - end.x));
    const height = Math.abs(this.getY(start.y - end.y));
    let length;
    let direction;

    if (width < height) {
      length = height;
      direction = start.y < end.y ? DIRECTION_ARROW.down : DIRECTION_ARROW.up;
    } else {
      length = width;
      direction = start.x < end.x ? DIRECTION_ARROW.right : DIRECTION_ARROW.left;
    }

    return <Arrow key={randomId()} x={x} y={y} length={length} direction={direction} />;
  }

  drawLine() {
    const { start, end } = this.state;
    const x = start.x < end.x ? this.getX(start.x) : this.getX(end.x);
    const y = start.y < end.y ? this.getY(start.y) : this.getY(end.y);
    const width = Math.abs(this.getX(start.x - end.x));
    const height = Math.abs(this.getY(start.y - end.y));
    let length;
    let direction;

    if (width < height) {
      length = height;
      direction = DIRECTION_LINE.vertical;
    } else {
      length = width;
      direction = DIRECTION_LINE.horizontal;
    }
    return <Line key={randomId()} x={x} y={y} length={length} direction={direction} />;
  }

  drawRectangle() {
    const { start, end } = this.state;
    const x = start.x < end.x ? this.getX(start.x) : this.getX(end.x);
    const y = start.y < end.y ? this.getY(start.y) : this.getY(end.y);
    const width = Math.abs(this.getX(start.x - end.x));
    const height = Math.abs(this.getY(start.y - end.y));

    return <Rectangle key={randomId()} x={x} y={y} width={width} height={height} />;
  }

  drawText() {
    const { start } = this.state;
  }

  draw() {
    const { tool } = this.props;

    let shape = null;
    switch (tool) {
      case TOOLS.rectangle:
        shape = this.drawRectangle();
        break;
      case TOOLS.arrow:
        shape = this.drawArrow();
        break;
      case TOOLS.Line:
        shape = this.drawLine();
        break;
      default:
        break;
    }
    this.setState({ drawing: shape });
  }


  render() {
    const { content, drawing } = this.state;
    return (
      <Wrapper
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        {drawing}
        {content.map(el => el)}
        {console.log(content, drawing)}
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
