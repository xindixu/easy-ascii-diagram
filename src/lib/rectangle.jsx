import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content } from './style';
import { TOOLS } from '../constants';

class Rectangle extends Component {
  static shape = TOOLS.rectangle

  static charSet = {
    corner: '+',
    horizontalEdge: '-',
    verticalEdge: '|',
    inner: ' ',
  }

  static toString(width, height) {
    let text = '';
    for (let j = 0; j < height; j += 1) {
      for (let i = 0; i < width; i += 1) {
        if ((i === 0 || i === width - 1) && (j === 0 || j === height - 1)) {
          text += Rectangle.charSet.corner;
        } else if ((i > 0 && i < width - 1) && (j === 0 || j === height - 1)) {
          text += Rectangle.charSet.horizontalEdge;
        } else if ((i === 0 || i === width - 1) && (j > 0 && j < height - 1)) {
          text += Rectangle.charSet.verticalEdge;
        } else {
          text += Rectangle.charSet.inner;
        }
      }
      text += '\n';
    }
    return text;
  }

  state = {
    x: this.props.x,
    y: this.props.y,
    width: this.props.width,
    height: this.props.height,
  }

  moveTo(x, y) {
    this.setState({ x, y });
  }

  resize(width, height) {
    this.setState({ width, height });
  }


  render() {
    const {
      x, y, width, height,
    } = this.state;
    return <Content x={x} y={y} width={width} height={height}>{Rectangle.toString(width, height)}</Content>;
  }
}

Rectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Rectangle;
