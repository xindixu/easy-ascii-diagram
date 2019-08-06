import React, { Component } from 'react';
import { Content } from './style';
import { TOOLS, DIRECTION, DIRECTION_ARROW } from '../constants';

class Arrow extends Component {
  constructor(x, y, length, direction) {
    super();

    if (!Object.values(DIRECTION_ARROW).includes(direction)) {
      throw Error('Direction not valid');
    }

    this.name = TOOLS.arrow;
    this.x = x;
    this.y = y;
    this.length = length;
    this.direction = direction;
    this.charSet = {
      horizontal: '-',
      vertical: '|',
      up: '^',
      down: 'V',
      left: '<',
      right: '>',
      end: '+',
    };
    this.text = this.toString();
  }

  toString() {
    let text = '';
    switch (this.direction) {
      case DIRECTION.left:
        text += this.charSet.left;
        for (let i = 1; i < this.length - 1; i += 1) {
          text += this.charSet.horizontal;
        }
        text += this.charSet.end;
        break;

      case DIRECTION.right:
        text += this.charSet.end;
        for (let i = 1; i < this.length - 1; i += 1) {
          text += this.charSet.horizontal;
        }
        text += this.charSet.right;
        break;

      case DIRECTION.up:
        text += `${this.charSet.up}\n`;
        for (let i = 1; i < this.length - 1; i += 1) {
          text += `${this.charSet.vertical}\n`;
        }
        text += this.charSet.end;
        break;

      case DIRECTION.down:
        text += `${this.charSet.end}\n`;
        for (let i = 1; i < this.length - 1; i += 1) {
          text += `${this.charSet.vertical}\n`;
        }
        text += this.charSet.down;
        break;

      default:
        break;
    }
    return text;
  }

  render() {
    return <Content x={this.x} y={this.y}>{this.text}</Content>;
  }
}

export default Arrow;
