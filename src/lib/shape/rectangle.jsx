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
    const { width, height, ...rest } = nextProps;
    const state = {
      ...rest,
      text: Rectangle.convert(width, height)
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
    const { x, y, zoomLevel, handleOnDoubleClick } = this.props;
    const { text } = this.state;
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
