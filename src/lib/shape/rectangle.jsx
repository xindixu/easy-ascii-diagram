import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { BorderOnly, Debug } from "./style";
import { TOOLS } from "../../constants";

class Rectangle extends Component {
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
    if (prevState.width === width && prevState.height === height)
      return { ...nextProps };

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
    this.shape = TOOLS.rectangle;
  }

  render() {
    const { x, y, zoomLevel, handleOnDoubleClick, editing } = this.props;
    const { text, width, height } = this.state;
    return (
      <>
        <BorderOnly
          x={x}
          y={y}
          zoomLevel={zoomLevel}
          onDoubleClick={handleOnDoubleClick}
          editing={editing}
        >
          {text}
        </BorderOnly>
        {/* <Debug x={x + 2} y={y + 2}>
          L{x}R{x + width}T{y}B{y + height}
        </Debug> */}
      </>
    );
  }
}

Rectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  handleOnDoubleClick: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default editable(Rectangle);
