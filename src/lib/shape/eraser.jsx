import React, { Component } from "react";
import PropTypes from "prop-types";
import { NoBackground } from "./style";
import { TOOLS } from "../../constants";

class Eraser extends Component {
  static shape = TOOLS.eraser;

  static charSet = {
    inner: " "
  };

  static convert(width, height) {
    let text = "";
    for (let j = 0; j < height; j += 1) {
      for (let i = 0; i < width; i += 1) {
        text += Eraser.charSet.inner;
      }
      text += "\n";
    }
    return text;
  }

  constructor(props) {
    super(props);
    const { width, height } = this.props;
    this.state = {
      ...this.props,
      text: Eraser.convert(width, height)
    };
  }

  render() {
    const { x, y, text } = this.state;
    const { zoomLevel } = this.props;
    return (
      <NoBackground x={x} y={y} zoomLevel={zoomLevel}>
        {text}
      </NoBackground>
    );
  }
}

Eraser.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default Eraser;
