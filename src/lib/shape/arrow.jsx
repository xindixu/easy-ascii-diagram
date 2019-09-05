import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { WithBackground, Debug } from "./style";
import { TOOLS, DIRECTION, DIRECTION_ARROW } from "../../constants";

class Arrow extends Component {
  static charSet = {
    horizontal: "-",
    vertical: "|",
    up: "^",
    down: "v",
    left: "<",
    right: ">",
    end: "+"
  };

  static convert(direction, length) {
    let text = "";
    switch (direction) {
      case DIRECTION.left:
        text += Arrow.charSet.left;
        for (let i = 1; i < length - 1; i += 1) {
          text += Arrow.charSet.horizontal;
        }
        text += Arrow.charSet.end;
        break;

      case DIRECTION.right:
        text += Arrow.charSet.end;
        for (let i = 1; i < length - 1; i += 1) {
          text += Arrow.charSet.horizontal;
        }
        text += Arrow.charSet.right;
        break;

      case DIRECTION.up:
        text += `${Arrow.charSet.up}\n`;
        for (let i = 1; i < length - 1; i += 1) {
          text += `${Arrow.charSet.vertical}\n`;
        }
        text += Arrow.charSet.end;
        break;

      case DIRECTION.down:
        text += `${Arrow.charSet.end}\n`;
        for (let i = 1; i < length - 1; i += 1) {
          text += `${Arrow.charSet.vertical}\n`;
        }
        text += Arrow.charSet.down;
        break;

      default:
        break;
    }
    return text;
  }

  static getWidthHeight = (direction, length) => {
    let width;
    let height;
    if ([DIRECTION.up, DIRECTION.down].includes(direction)) {
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
    if (prevState.length === length) return { ...nextProps };
    const { width, height } = Arrow.getWidthHeight(direction, length);
    const state = {
      ...rest,
      width,
      height,
      text: Arrow.convert(direction, length)
    };
    return state;
  }

  constructor(props) {
    super(props);
    const { direction, length } = this.props;
    const { width, height } = Arrow.getWidthHeight(direction, length);

    this.state = {
      ...this.props,
      width,
      height,
      text: Arrow.convert(direction, length)
    };
    this.shape = TOOLS.arrow;
  }

  render() {
    const { text, width, height } = this.state;
    const { x, y, zoomLevel, handleOnDoubleClick, editing } = this.props;
    return (
      <>
        <WithBackground
          x={x}
          y={y}
          zoomLevel={zoomLevel}
          onDoubleClick={handleOnDoubleClick}
          editing={editing}
        >
          {text}
        </WithBackground>
        {/* <Debug x={x + 2} y={y + 2}>
          L{x}R{x + width}T{y}B{y + height}
        </Debug> */}
      </>
    );
  }
}

Arrow.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_ARROW)]).isRequired,
  zoomLevel: PropTypes.number.isRequired,
  handleOnDoubleClick: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default editable(Arrow);
