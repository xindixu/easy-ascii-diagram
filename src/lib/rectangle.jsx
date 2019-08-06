import React, { Component } from 'react';
import { Content } from './style';
import { TOOLS } from '../constants';

class Rectangle extends Component {
  constructor(x, y, width, height) {
    super();
    this.name = TOOLS.rectangle;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = null;
    this.charSet = {
      corner: '+',
      horizontalEdge: '-',
      verticalEdge: '|',
      inner: ' ',
    };
    this.text = this.toString();
  }

  toString() {
    let text = '';
    for (let j = 0; j < this.height; j += 1) {
      for (let i = 0; i < this.width; i += 1) {
        if ((i === 0 || i === this.width - 1) && (j === 0 || j === this.height - 1)) {
          text += this.charSet.corner;
        } else if ((i > 0 && i < this.width - 1) && (j === 0 || j === this.height - 1)) {
          text += this.charSet.horizontalEdge;
        } else if ((i === 0 || i === this.width - 1) && (j > 0 && j < this.height - 1)) {
          text += this.charSet.verticalEdge;
        } else {
          text += this.charSet.inner;
        }
      }
      text += '\n';
    }
    return text;
  }

  render() {
    return <Content x={this.x} y={this.y}>{this.text}</Content>;
  }
}

export default Rectangle;
