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
    const { x, y, width, height, id, horizontal, vertical } = this.props;

    return (
      <Wrapper id={id} x={x} y={y} width={width} height={height}>
        {horizontal ? (
          <>
            <Left />
            <Right />
          </>
        ) : null}

        {vertical ? (
          <>
            <Top />
            <Bottom />
          </>
        ) : null}

        {horizontal && vertical ? (
          <>
            <TopLeft />
            <TopRight />
            <BottomLeft />
            <BottomRight />
          </>
        ) : null}
      </Wrapper>
    );
  }
}

Editor.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  horizontal: PropTypes.bool.isRequired,
  vertical: PropTypes.bool.isRequired
};

export default Editor;
