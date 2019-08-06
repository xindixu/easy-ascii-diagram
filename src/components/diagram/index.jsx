import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './style';
import { DIRECTION } from '../../constants';

import Rectangle from '../../lib/rectangle';
import Line from '../../lib/line';

class Diagram extends Component {
  state = {
    content: [new Rectangle(1, 2, 12, 12), new Line(20, 3, 10, DIRECTION.horizontal)],
  }

  render() {
    const { content } = this.state;
    return (
      <Wrapper>
        {content.map(el => (
          el.render()
        ))}
      </Wrapper>
    );
  }
}

Diagram.defaultProps = {
};
Diagram.propTypes = {
};

export default Diagram;
