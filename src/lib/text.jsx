import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Content } from './style';
import { TOOLS } from '../constants';

class Text extends Component {
  static shape = TOOLS.Text

  static toString(content) {
    return content;
  }

  state = {
    x: this.props.x,
    y: this.props.y,
    content: this.props.content,
  }

  render() {
    const {
      x, y, content,
    } = this.state;
    return <Content x={x} y={y}>{Text.toString(content)}</Content>;
  }
}


Text.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default Text;
