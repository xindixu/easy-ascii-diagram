import React, { Component } from "react";
import PropTypes from "prop-types";
import { NoBackground } from "./style";
import { TOOLS } from "../constants";
import { randomId } from "../util";

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

  state = {
    x: this.props.x,
    y: this.props.y,
    width: this.props.width,
    height: this.props.height,
    text: ""
  };

  componentDidMount() {
    const { width, height } = this.state;
    const text = Eraser.convert(width, height);
    this.setState({ text });
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

export const erase = ({ x, y, width, height, zoomLevel }) => (
  <Eraser
    key={randomId()}
    x={x}
    y={y}
    width={width}
    height={height}
    zoomLevel={zoomLevel}
  />
);

erase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
};
