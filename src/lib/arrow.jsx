import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content } from './style';
import { TOOLS, DIRECTION, DIRECTION_ARROW } from '../constants';

class Arrow extends Component {
  static shape = TOOLS.arrow

  static charSet = {
    horizontal: '-',
    vertical: '|',
    up: '^',
    down: 'v',
    left: '<',
    right: '>',
    end: '+',
  };


  static toString(direction, length) {
    let text = '';
    switch (direction) {
      case DIRECTION.left:
        text += Arrow.charSet.left;
        for (let i = 1; i < length - 1; i += 1) {
          text += Arrow.charSet.horizontal;
        }
        text += Arrow.charSet.end;
        break;

      case DIRECTION.right:
        text += Arrow.charSet.end;
        for (let i = 1; i < length - 1; i += 1) {
          text += Arrow.charSet.horizontal;
        }
        text += Arrow.charSet.right;
        break;

      case DIRECTION.up:
        text += `${Arrow.charSet.up}\n`;
        for (let i = 1; i < length - 1; i += 1) {
          text += `${Arrow.charSet.vertical}\n`;
        }
        text += Arrow.charSet.end;
        break;

      case DIRECTION.down:
        text += `${Arrow.charSet.end}\n`;
        for (let i = 1; i < length - 1; i += 1) {
          text += `${Arrow.charSet.vertical}\n`;
        }
        text += Arrow.charSet.down;
        break;

      default:
        break;
    }
    return text;
  }

  state = {
    x: this.props.x,
    y: this.props.y,
    length: this.props.length,
    direction: this.props.direction,
  }


  render() {
    const {
      x, y, direction, length,
    } = this.state;
    return <Content x={x} y={y}>{Arrow.toString(direction, length)}</Content>;
  }
}


Arrow.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_ARROW)]).isRequired,

};


export default Arrow;
