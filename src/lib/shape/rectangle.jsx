import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { BorderOnly } from "./style";
import { TOOLS } from "../../constants";

class Rectangle extends Component {
  static shape = TOOLS.rectangle;

  static charSet = {
    corner: "+",
    horizontalEdge: "-",
    verticalEdge: "|",
    inner: " "
  };

  static convert(width, height) {
    let text = "";
    for (let j = 0; j < height; j += 1) {
      for (let i = 0; i < width; i += 1) {
        if ((i === 0 || i === width - 1) && (j === 0 || j === height - 1)) {
          text += Rectangle.charSet.corner;
        } else if (i > 0 && i < width - 1 && (j === 0 || j === height - 1)) {
          text += Rectangle.charSet.horizontalEdge;
        } else if ((i === 0 || i === width - 1) && (j > 0 && j < height - 1)) {
          text += Rectangle.charSet.verticalEdge;
        } else {
          text += Rectangle.charSet.inner;
        }
      }
      text += "\n";
    }
    return text;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { x, y, width, height, editing, ...rest } = nextProps;
    if (!editing) return null;

    const { x: oldX, y: oldY, width: oldWidth, height: oldHeight } = prevState;
    const { start, end } = editing;
    const newWidth = oldWidth + end.x - start.x;
    const newHeight = oldHeight + end.y - start.y;

    const state = {
      ...rest,
      x,
      y,
      width: newWidth,
      height: newHeight,
      text: Rectangle.convert(newWidth, newHeight)
    };
    return state;
  }

  constructor(props) {
    super(props);
    const { width, height } = this.props;
    this.state = {
      ...this.props,
      text: Rectangle.convert(width, height)
    };
  }

  render() {
    const { x, y, text } = this.state;
    const { zoomLevel, handleOnDoubleClick } = this.props;
    return (
      <BorderOnly
        x={x}
        y={y}
        zoomLevel={zoomLevel}
        onDoubleClick={handleOnDoubleClick}
      >
        {text}
      </BorderOnly>
    );
  }
}

Rectangle.propTypes = {
  editing: null
};

Rectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  handleOnDoubleClick: PropTypes.func.isRequired,
  editing: PropTypes.shape({
    start: PropTypes.any,
    end: PropTypes.any
  })
};

export default editable(Rectangle);
