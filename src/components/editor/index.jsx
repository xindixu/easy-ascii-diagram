import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Wrapper,
  Top,
  Bottom,
  Left,
  Right,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight
} from "./style";

class Editor extends Component {
  render() {
    const { x, y, width, height, id } = this.props;

    return (
      <Wrapper id={id} x={x} y={y} width={width} height={height}>
        <Top />
        <Bottom />
        <Left />
        <Right />
        <TopLeft />
        <TopRight />
        <BottomLeft />
        <BottomRight />
      </Wrapper>
    );
  }
}

Editor.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default Editor;
