import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { WithBackground } from "./style";
import { TOOLS, DIRECTION, DIRECTION_LINE } from "../../constants";

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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { direction, length, ...rest } = nextProps;
    if (prevState.direction === direction && prevState.length === length)
      return { ...nextProps };

    const state = {
      ...rest,
      text: Line.convert(direction, length)
    };
    return state;
  }

  constructor(props) {
    super(props);
    const { direction, length } = this.props;
    this.state = {
      ...this.props,
      text: Line.convert(direction, length)
    };
  }

  render() {
    const { text } = this.state;
    const { x, y, zoomLevel, handleOnDoubleClick } = this.props;

    return (
      <WithBackground
        x={x}
        y={y}
        zoomLevel={zoomLevel}
        onDoubleClick={handleOnDoubleClick}
      >
        {text}
      </WithBackground>
    );
  }
}

Line.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_LINE)]).isRequired,
  zoomLevel: PropTypes.number.isRequired,
  handleOnDoubleClick: PropTypes.func.isRequired
};

export default editable(Line);
