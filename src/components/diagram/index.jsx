import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./style";
import {
  TOOLS,
  GRID_WIDTH,
  GRID_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DIRECTION_ARROW,
  DIRECTION_LINE
} from "../../constants";

import Rectangle from "../../lib/rectangle";
import Line from "../../lib/line";
import Arrow from "../../lib/arrow";
import Text from "../../lib/text";

const randomId = () => Date.now() / 10000 + Math.random().toFixed(4);
class Diagram extends Component {
  state = {
    isDrawing: false,
    isTyping: false,
    start: null,
    end: null,
    drawing: null,
    textBuffer: ""
  };

  componentDidMount() {}

  handleMouseDown = e => {
    const { isTyping } = this.state;
    if (isTyping) {
      this.commit();
    }
    this.setState({
      isDrawing: true,
      start: { x: e.clientX, y: e.clientY },
      end: { x: e.clientX, y: e.clientY }
    });
  };

  handleMouseMove = e => {
    const { tool } = this.props;
    if (tool === TOOLS.text) return;

    if (this.state.isDrawing === true) {
      this.setState({
        end: { x: e.clientX, y: e.clientY }
      });
      this.draw();
    }
  };

  handleMouseUp = e => {
    const { tool } = this.props;
    if (tool === TOOLS.text) return;

    this.setState({
      end: { x: e.clientX, y: e.clientY }
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

  commit() {
    const { drawing } = this.state;
    if (drawing !== null) {
      this.props.commitDrawing(drawing);
      this.setState({
        drawing: null,
        textBuffer: ""
      });
    }
    this.setState({
      isDrawing: false
    });
  }

  // calculateTotalGridNumber() {
  //   const { zoomLevel } = this.props;
  //   const totalRow = Math.floor(CANVAS_HEIGHT / zoomLevel);
  //   const totalColumn = Math.floor(CANVAS_WIDTH / zoomLevel);
  //   return { totalRow, totalColumn };
  // }

  drawArrow() {
    const { start, end } = this.state;
    const x = start.x < end.x ? this.getX(start.x) : this.getX(end.x);
    const y = start.y < end.y ? this.getY(start.y) : this.getY(end.y);
    const width = Math.abs(this.getX(start.x - end.x));
    const height = Math.abs(this.getY(start.y - end.y));
    let length;
    let direction;

    if (width < height) {
      length = height;
      direction = start.y < end.y ? DIRECTION_ARROW.down : DIRECTION_ARROW.up;
    } else {
      length = width;
      direction =
        start.x < end.x ? DIRECTION_ARROW.right : DIRECTION_ARROW.left;
    }

    return (
      <Arrow
        key={randomId()}
        x={x}
        y={y}
        length={length}
        direction={direction}
      />
    );
  }

  drawLine() {
    const { start, end } = this.state;
    const x = start.x < end.x ? this.getX(start.x) : this.getX(end.x);
    const y = start.y < end.y ? this.getY(start.y) : this.getY(end.y);
    const width = Math.abs(this.getX(start.x - end.x));
    const height = Math.abs(this.getY(start.y - end.y));
    let length;
    let direction;

    if (width < height) {
      length = height;
      direction = DIRECTION_LINE.vertical;
    } else {
      length = width;
      direction = DIRECTION_LINE.horizontal;
    }
    return (
      <Line
        key={randomId()}
        x={x}
        y={y}
        length={length}
        direction={direction}
      />
    );
  }

  drawRectangle() {
    const { start, end } = this.state;
    const x = start.x < end.x ? this.getX(start.x) : this.getX(end.x);
    const y = start.y < end.y ? this.getY(start.y) : this.getY(end.y);
    const width = Math.abs(this.getX(start.x - end.x));
    const height = Math.abs(this.getY(start.y - end.y));

    return (
      <Rectangle key={randomId()} x={x} y={y} width={width} height={height} />
    );
  }

  drawText(textBuffer) {
    const { start } = this.state;
    const x = this.getX(start.x);
    const y = this.getY(start.y);
    return <Text key={randomId()} x={x} y={y} content={textBuffer} />;
  }

  erase() {
    const { start, end } = this.state;
  }

  draw(content) {
    const { tool } = this.props;

    let shape = null;
    switch (tool) {
      case TOOLS.rectangle:
        shape = this.drawRectangle();
        break;
      case TOOLS.arrow:
        shape = this.drawArrow();
        break;
      case TOOLS.line:
        shape = this.drawLine();
        break;
      case TOOLS.text:
        shape = this.drawText(content);
        break;
      case TOOLS.eraser:
        this.erase();
        break;
      default:
        break;
    }
    this.setState({ drawing: shape });
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
  commitDrawing: PropTypes.func.isRequired
};

export default Diagram;
