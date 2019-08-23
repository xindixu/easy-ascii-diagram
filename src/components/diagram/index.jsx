import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { Wrapper } from "./style";
import {
  TOOLS,
  GRID_WIDTH,
  GRID_HEIGHT,
  DIRECTION_ARROW,
  DIRECTION_LINE
} from "../../constants";

import Rectangle from "../../lib/rectangle";
import Line from "../../lib/line";
import Arrow from "../../lib/arrow";
import Text from "../../lib/text";
import Eraser from "../../lib/eraser";

const randomId = () => Date.now() / 10000 + Math.random().toFixed(4);
class Diagram extends Component {
  state = {
    isDrawing: false,
    isTyping: false,
    start: null,
    end: null,
    drawing: null,
    textBuffer: "",
    borderBuffer: {
      up: 0,
      down: 0,
      left: 0,
      right: 0
    }
  };

  handleResize = debounce(e => {
    console.log(e);
  }, 500);

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleMouseDown = e => {
    const { isTyping } = this.state;
    if (isTyping) {
      this.commit();
      this.setState({ isTyping: false });
      return;
    }
    this.setState({
      isDrawing: true,
      start: { x: this.getX(e.clientX), y: this.getY(e.clientY) },
      end: { x: this.getX(e.clientX), y: this.getY(e.clientY) }
    });
  };

  handleMouseMove = e => {
    const { tool } = this.props;
    if (tool === TOOLS.text) return;

    if (this.state.isDrawing === true) {
      this.setState({
        end: { x: this.getX(e.clientX), y: this.getY(e.clientY) }
      });
      this.draw();
    }
  };

  handleMouseUp = e => {
    const { tool } = this.props;
    if (tool === TOOLS.text) return;
    this.setState({
      end: { x: this.getX(e.clientX), y: this.getY(e.clientY) }
    });

    this.commit();
  };

  handleKeyDown = e => {
    const { tool } = this.props;
    const { isDrawing } = this.state;

    if (tool === TOOLS.text && isDrawing) {
      const { textBuffer } = this.state;
      let content = "";
      let needToDraw = false;

      switch (e.key) {
        case "Backspace":
          content = textBuffer.substring(0, textBuffer.length - 1);
          needToDraw = true;
          break;
        default:
          break;
      }

      if (needToDraw) {
        this.draw(content);
        this.setState({ textBuffer: content });
      }
    }
  };

  handleKeyPress = e => {
    const { tool } = this.props;
    const { isDrawing } = this.state;

    if (tool === TOOLS.text && isDrawing) {
      const { textBuffer } = this.state;
      let content = "";

      if (e.key === "Enter") {
        content = `${textBuffer}\n`;
      } else {
        content = `${textBuffer}${e.key}`;
      }
      this.draw(content);
      this.setState({ textBuffer: content, isTyping: true });
    }
  };

  getX = x => Math.floor(x / GRID_WIDTH / this.props.zoomLevel);

  getY = y => Math.floor(y / GRID_HEIGHT / this.props.zoomLevel) - 1;

  drawArrow = ({ x, y, length, direction }) => (
    <Arrow
      key={randomId()}
      x={x}
      y={y}
      length={length}
      direction={direction}
      zoomLevel={this.props.zoomLevel}
    />
  );

  drawLine = ({ x, y, length, direction }) => (
    <Line
      key={randomId()}
      x={x}
      y={y}
      length={length}
      direction={direction}
      zoomLevel={this.props.zoomLevel}
    />
  );

  drawRectangle = ({ x, y, width, height }) => (
    <Rectangle
      key={randomId()}
      x={x}
      y={y}
      width={width}
      height={height}
      zoomLevel={this.props.zoomLevel}
    />
  );

  drawText = ({ x, y, content }) => (
    <Text
      key={randomId()}
      x={x}
      y={y}
      content={content}
      zoomLevel={this.props.zoomLevel}
    />
  );

  erase = ({ x, y, width, height }) => (
    <Eraser
      key={randomId()}
      x={x}
      y={y}
      width={width}
      height={height}
      zoomLevel={this.props.zoomLevel}
    />
  );

  commit() {
    const { drawing, borderBuffer } = this.state;
    if (drawing !== null) {
      this.props.commitDrawing(drawing);
      this.props.updateBorder(borderBuffer);
      this.setState({
        drawing: null,
        textBuffer: ""
      });
    }
    this.setState({
      isDrawing: false
    });
  }

  draw(content) {
    const { tool } = this.props;
    const { start, end } = this.state;

    let shape = null;

    const x = start.x < end.x ? start.x : end.x;
    const y = start.y < end.y ? start.y : end.y;
    const width = Math.abs(start.x - end.x);
    const height = Math.abs(start.y - end.y);
    let direction;
    let length;

    switch (tool) {
      case TOOLS.rectangle:
        shape = this.drawRectangle({ x, y, width, height });
        break;

      case TOOLS.arrow:
        if (width < height) {
          length = height;
          direction =
            start.y < end.y ? DIRECTION_ARROW.down : DIRECTION_ARROW.up;
        } else {
          length = width;
          direction =
            start.x < end.x ? DIRECTION_ARROW.right : DIRECTION_ARROW.left;
        }
        shape = this.drawArrow({ x, y, length, direction });
        break;

      case TOOLS.line:
        if (width < height) {
          length = height;
          direction = DIRECTION_LINE.vertical;
        } else {
          length = width;
          direction = DIRECTION_LINE.horizontal;
        }
        shape = this.drawLine({ x, y, length, direction });
        break;

      case TOOLS.text:
        shape = this.drawText({ x, y, content });
        break;

      case TOOLS.eraser:
        shape = this.erase({ x, y, width, height });
        break;

      default:
        break;
    }

    this.setState({
      drawing: shape,
      borderBuffer: {
        up: y,
        down: y + height + 1,
        left: x,
        right: x + width + 1
      }
    });
  }

  render() {
    const { drawing } = this.state;
    const { tool, content } = this.props;

    return (
      <Wrapper
        tabIndex={-1}
        tool={tool}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyDown}
      >
        {content.map(el => el)}
        {drawing}
      </Wrapper>
    );
  }
}

Diagram.defaultProps = {
  zoomLevel: 1
};
Diagram.propTypes = {
  tool: PropTypes.oneOf([...Object.values(TOOLS)]).isRequired,
  zoomLevel: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.node).isRequired,
  commitDrawing: PropTypes.func.isRequired,
  updateBorder: PropTypes.func.isRequired
};

export default Diagram;
