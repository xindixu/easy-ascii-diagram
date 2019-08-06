import React, { Component } from 'react';
import { Content } from './style';
import { TOOLS, DIRECTION } from '../constants';

class Line extends Component {
  constructor(x, y, length, direction) {
    super();

    if (direction !== DIRECTION.horizontal && direction !== DIRECTION.vertical) {
      throw Error('Direction not valid');
    }

    this.name = TOOLS.line;
    this.x = x;
    this.y = y;
    this.length = length;
    this.direction = direction;
    this.charSet = {
      horizontalEdge: '-',
      verticalEdge: '|',
    };
    this.text = this.toString();
  }

  toString() {
    let text = '';
    if (this.direction === DIRECTION.horizontal) {
      for (let i = 0; i < this.length; i += 1) {
        text += this.charSet.horizontalEdge;
      }
    } else {
      for (let i = 0; i < this.length; i += 1) {
        text += this.charSet.verticalEdge;
      }
    }
    return text;
  }

  render() {
    return <Content x={this.x} y={this.y}>{this.text}</Content>;
  }
}

export default Line;