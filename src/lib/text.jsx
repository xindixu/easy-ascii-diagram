import React, { Component } from 'react';
import { Content } from './style';
import { TOOLS, DIRECTION, DIRECTION_ARROW } from '../constants';

class Text extends Component {
  constructor(x, y, content) {
    super();

    this.name = TOOLS.Text;
    this.x = x;
    this.y = y;
    this.content = content;
    this.text = this.toString();
  }

  toString() {
    return this.content;
  }

  render() {
    return <Content x={this.x} y={this.y}>{this.text}</Content>;
  }
}

export default Text;
