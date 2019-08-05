import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Content } from './style';

class Diagram extends Component {
  state = {
    content: [],
  }

  render() {
    return (
      <Wrapper>
        <Content x={1} y={2}>+------------------+</Content>
        <Content x={2} y={10}>+------------------+</Content>
      </Wrapper>
    );
  }
}

Diagram.defaultProps = {
};
Diagram.propTypes = {
};

export default Diagram;
