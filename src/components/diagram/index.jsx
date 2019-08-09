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
    content: [],
  }

  render() {
    const { content } = this.state;
    return (
      <Wrapper>
        <Text x={10} y={3} content="xindi loves justin" />
        <Line x={25} y={10} length={21} direction={DIRECTION.horizontal} />
        <Arrow x={25} y={10} length={21} direction={DIRECTION.up} />
        <Rectangle x={1} y={2} width={12} height={12} />
      </Wrapper>
    );
  }
}

Diagram.defaultProps = {
};
Diagram.propTypes = {
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
};

export default Diagram;
