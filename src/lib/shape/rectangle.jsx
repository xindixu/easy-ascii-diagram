import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { BorderOnly } from "./style";
import { TOOLS, EDITOR } from "../../constants";

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
    const { editing, ...rest } = nextProps;
    if (!editing) return null;

    const { x, y, width, height } = prevState;
    const { start, end, direction } = editing;

    let newWidth;
    let newHeight;
    let newX;
    let newY;

    switch (direction) {
      case EDITOR.left:
        newX = end.x;
        newWidth = x - end.x + width;
        break;
      case EDITOR.right:
        newWidth = end.x - x;
        break;
      case EDITOR.top:
        newY = end.y;
        newHeight = y - end.y + height;
        break;
      case EDITOR.bottom:
        newHeight = end.y - y;
        break;
      case EDITOR.topLeft:
        newX = end.x;
        newWidth = x - end.x + width;
        newY = end.y;
        newHeight = y - end.y + height;
        break;
      case EDITOR.topRight:
        newWidth = end.x - x;
        newY = end.y;
        newHeight = y - end.y + height;
        break;
      case EDITOR.bottomLeft:
        newX = end.x;
        newWidth = x - end.x + width;
        newHeight = end.y - y;
        break;
      case EDITOR.bottomRight:
        newWidth = end.x - x;
        newHeight = end.y - y;
        break;
      default:
        break;
    }

    const state = {
      ...rest,
      x: newX || x,
      y: newY || y,
      width: newWidth || width,
      height: newHeight || height,
      text: Rectangle.convert(newWidth || width, newHeight || height)
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
