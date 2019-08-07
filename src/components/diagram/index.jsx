import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './style';
import { DIRECTION } from '../../constants';

import Rectangle from '../../lib/rectangle';
import Line from '../../lib/line';
import Arrow from '../../lib/arrow';
import Text from '../../lib/text';

class Diagram extends Component {
  state = {
    content: [
      new Rectangle(1, 2, 12, 12),
      new Line(20, 3, 10, DIRECTION.vertical),
      new Arrow(25, 3, 10, DIRECTION.up),
      new Arrow(25, 3, 10, DIRECTION.left),
      new Arrow(30, 2, 10, DIRECTION.right),
      new Arrow(30, 20, 10, DIRECTION.down),
      new Text(2, 3, 'xindi love justin'),
    ],
  }

  render() {
    const { content } = this.state;
    return (
      <Wrapper>
        <Rectangle x={1} y={2} width={12} height={12} />
      </Wrapper>
    );
  }
}

Diagram.defaultProps = {
};
Diagram.propTypes = {
};

export default Diagram;
