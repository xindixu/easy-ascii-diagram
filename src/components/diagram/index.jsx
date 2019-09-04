import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./style";
import { TOOLS, DIRECTION_ARROW, DIRECTION_LINE } from "../../constants";

import {
  drawRectangle,
  drawLine,
  drawArrow,
  drawText,
  erase
} from "../../lib/draw";

import { getX, getY, randomId } from "../../util";

class Diagram extends Component {
  state = {
    isDrawing: false,
    // isEditing: false,
    isTyping: false,
    start: null,
    end: null,
    drawing: {
      shape: null,
      key: "",
      ref: null
    },
    // editing: {
    //   target: null
    // },
    textBuffer: "",
    borderBuffer: {
      up: 0,
      down: 0,
      left: 0,
      right: 0
    }
  };

  enterEditMode = () => {
    this.setState({
      isEditing: true
    });
  };

  exitEditMode = () => {
    this.setState({
      isEditing: false
    });
  };

  handleMouseDown = e => {
    const { isTyping, isEditing } = this.state;
    if (isEditing) return;
    if (isTyping) {
      this.commit();
      this.setState({ isTyping: false });
      return;
    }
    this.setState({
      isDrawing: true,
      start: { x: getX(e.clientX), y: getY(e.clientY) },
      end: { x: getX(e.clientX), y: getY(e.clientY) }
    });
  };

  handleMouseMove = e => {
    const { tool } = this.props;
    if (tool === TOOLS.text) return;
    const { isDrawing } = this.state;
    if (isDrawing === true) {
      this.setState({
        end: { x: getX(e.clientX), y: getY(e.clientY) }
      });
      this.draw();
    }
  };

  handleMouseUp = e => {
    const { tool } = this.props;
    if (tool === TOOLS.text) return;
    this.setState({
      end: { x: getX(e.clientX), y: getY(e.clientY) }
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

  commit() {
    const { drawing, borderBuffer } = this.state;
    const { commitDrawing, updateBorder } = this.props;
    const { shape } = drawing;
    if (shape !== null) {
      commitDrawing(drawing);
      updateBorder(borderBuffer);
      this.setState({
        drawing: {
          shape: null,
          key: "",
          ref: null
        },
        textBuffer: ""
      });
    }
    this.setState({
      isDrawing: false
    });
  }

  draw(content) {
    const { tool, zoomLevel, handleLayer } = this.props;
    const { start, end } = this.state;

    let shape = null;
    const id = randomId();
    const ref = React.createRef();

    let x = start.x < end.x ? start.x : end.x;
    let y = start.y < end.y ? start.y : end.y;
    const width = Math.abs(start.x - end.x);
    const height = Math.abs(start.y - end.y);
    let direction;
    let length;

    const sharedProps = {
      x,
      y,
      id,
      key: id,
      ref,
      zoomLevel,
      enterEditMode: this.enterEditMode,
      exitEditMode: this.exitEditMode,
      commitEditing: this.commitDrawing,
      handleLayer
    };

    switch (tool) {
      case TOOLS.rectangle:
        shape = drawRectangle({
          ...sharedProps,
          width,
          height
        });
        break;

      case TOOLS.arrow:
        if (width < height) {
          length = height;
          direction =
            start.y < end.y ? DIRECTION_ARROW.down : DIRECTION_ARROW.up;
          x = start.x;
        } else {
          length = width;
          direction =
            start.x < end.x ? DIRECTION_ARROW.right : DIRECTION_ARROW.left;
          y = start.y;
        }

        shape = drawArrow({
          ...sharedProps,
          x,
          y,
          length,
          direction
        });
        break;

      case TOOLS.line:
        if (width < height) {
          length = height;
          direction = DIRECTION_LINE.vertical;
          x = start.x;
        } else {
          length = width;
          direction = DIRECTION_LINE.horizontal;
          y = start.y;
        }
        shape = drawLine({
          ...sharedProps,
          x,
          y,
          length,
          direction
        });
        break;

      case TOOLS.text:
        shape = drawText({
          ...sharedProps,
          content
        });
        break;

      case TOOLS.eraser:
        shape = erase({ x, y, width, height, zoomLevel });
        break;

      default:
        break;
    }

    this.setState({
      drawing: { shape, id, ref },
      borderBuffer: {
        up: y,
        down: height === 0 ? y + 1 : y + height,
        left: x,
        right: width === 0 ? x + 1 : x + width
      }
    });
  }

  render() {
    const { drawing, isEditing, isDrawing } = this.state;
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
        {drawing.shape}
        {isEditing ? <p>Editing</p> : null}
        {isDrawing ? <p>Drawing</p> : null}
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
