import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { WithBackground } from "./style";
import { TOOLS, DIRECTION, DIRECTION_LINE } from "../../constants";

class Shape extends Component {
  static charSet = {
    [TOOLS.line]: {
      horizontalEdge: "-",
      verticalEdge: "|"
    },
    [TOOLS.arrow]: {
      horizontal: "-",
      vertical: "|",
      up: "^",
      down: "v",
      left: "<",
      right: ">",
      end: "+"
    },
    [TOOLS.rectangle]: {
      corner: "+",
      horizontalEdge: "-",
      verticalEdge: "|",
      inner: " "
    },
    [TOOLS.eraser]: {
      inner: " "
    }
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

  static getWidthHeight = (direction, length) => {
    let width;
    let height;
    if (direction === DIRECTION.vertical) {
      width = 1;
      height = length;
    } else {
      width = length;
      height = 1;
    }
    return { width, height };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { direction, length, ...rest } = nextProps;
    if (prevState.direction === direction && prevState.length === length)
      return { ...nextProps };

    const { width, height } = Line.getWidthHeight(direction, length);

    const state = {
      ...rest,
      width,
      height,
      text: Line.convert(direction, length)
    };
    return state;
  }

  constructor(props) {
    super(props);
    const { width, height, shape } = this.props;
    console.log(Shape.charSet);
    this.state = {
      ...this.props,
      width,
      height,
      text: Line.convert(direction, length)
    };
    this.shape = TOOLS.line;
  }

  render() {
    const { text } = this.state;
    const { x, y, zoomLevel, handleOnDoubleClick, editing } = this.props;

    return (
      <WithBackground
        x={x}
        y={y}
        zoomLevel={zoomLevel}
        onDoubleClick={handleOnDoubleClick}
        editing={editing}
      >
        {text}
      </WithBackground>
    );
  }
}

Shape.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_LINE)]).isRequired,
  zoomLevel: PropTypes.number.isRequired,
  handleOnDoubleClick: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default editable(Shape);
