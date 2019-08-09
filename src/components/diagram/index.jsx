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
      <Line key={randomId()} x={20} y={2} length={10} direction={DIRECTION_LINE.vertical} />,
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

  handleMouseMove = debounce((e) => {
    console.log('handling move');
    if (this.state.isDrawing === true) {
      this.setState({
        end: { x: e.clientX, y: e.clientY },
      });
    }
    this.draw();
  }, 200)

  handleMouseUp = (e) => {
    this.setState({
      isDrawing: false,
      end: { x: e.clientX, y: e.clientY },
    });
  }

  getX = x => Math.floor(x / GRID_WIDTH / this.props.zoomLevel);

  getY = y => Math.floor(y / GRID_HEIGHT / this.props.zoomLevel) - 2;


  calculateTotalGridNumber() {
    const { zoomLevel } = this.props;
    const totalRow = Math.floor(CANVAS_HEIGHT / zoomLevel);
    const totalColumn = Math.floor(CANVAS_WIDTH / zoomLevel);
    return { totalRow, totalColumn };
  }

  drawRectangle() {
    const { start, end } = this.state;

    const x = this.getX(start.x);
    const y = this.getY(start.y);
    const width = Math.abs(this.getX(end.x) - x);
    const height = Math.abs(this.getY(end.x) - y);

    return <Rectangle key={randomId()} x={x} y={y} width={width} height={height} />;
  }

  draw() {
    const { tool } = this.props;

    let shape = null;
    switch (tool) {
      case TOOLS.rectangle:
        shape = this.drawRectangle();
        break;
      case TOOLS.arrow:
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
        {console.log(content)}
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
