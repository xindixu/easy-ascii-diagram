import React, { Component } from "react";
import PropTypes from "prop-types";
import { WithBackground } from "./style";
import { TOOLS, DIRECTION, DIRECTION_LINE } from "../constants";

class Line extends Component {
  static shape = TOOLS.line;

  static charSet = {
    horizontalEdge: "-",
    verticalEdge: "|"
  };

  static convert(direction, length) {
    let text = "";
    if (direction === DIRECTION.horizontal) {
      for (let i = 0; i < length; i += 1) {
        text += Line.charSet.horizontalEdge;
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        text += `${Line.charSet.verticalEdge}\n`;
      }
    }
    return text;
  }

  state = {
    x: this.props.x,
    y: this.props.y,
    length: this.props.length,
    direction: this.props.direction,
    text: ""
  };

  componentDidMount() {
    const { direction, length } = this.state;
    const text = Line.convert(direction, length);
    this.setState({ text });
  }

  render() {
    const { x, y, text } = this.state;
    return (
      <WithBackground x={x} y={y}>
        {text}
      </WithBackground>
    );
  }
}

Line.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_LINE)]).isRequired
};

export default Line;
