import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Content } from './style';

import Rectangle from '../../lib/reactangle';

class Diagram extends Component {
  state = {
    content: [new Rectangle(1, 2, 12, 12)],
  }

  render() {
    const { content } = this.state;
    return (
      <Wrapper>
        {content.map(el => (
          <Content>{el.toString()}</Content>
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
