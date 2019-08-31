import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Wrapper,
  EditArea,
  Top,
  Bottom,
  Left,
  Right,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight
} from "./style";

import { getX, getY } from "../../util";
import { EDITOR } from "../../constants";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      start: null,
      end: null,
      pivot: null,
      direction: null,
      ...props
    };
  }

  handleMouseDown = e => {
    const start = { x: getX(e.clientX), y: getY(e.clientY) };
    this.setState({
      isDragging: true,
      direction: e.target.value,
      start,
      end: start
    });
  };

  handleMouseMove = e => {
    const { isDragging } = this.state;
    if (isDragging === true) {
      this.setState({
        end: { x: getX(e.clientX), y: getY(e.clientY) }
      });
      this.edit();
    }
  };

  handleMouseUp = e => {
    this.setState({
      isDragging: false,
      end: { x: getX(e.clientX), y: getY(e.clientY) }
    });
    this.commit();
  };

  handleMoveStart = e => {
    const { x, y } = this.state;
    const start = { x: getX(e.clientX), y: getY(e.clientY) };
    const pivot = { deltaX: start.x - x, deltaY: start.y - y };
    this.setState({
      isDragging: true,
      start,
      end: start,
      pivot
    });
    this.edit();
  };

  handleMoveEnd = e => {
    this.setState({
      isDragging: false,
      end: { x: getX(e.clientX), y: getY(e.clientY) }
    });
    this.commit();
  };

  edit() {
    const { edit, target } = this.props;
    const { end, pivot, direction, x, y, width, height } = this.state;
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
        if (end) {
          newX = end.x - pivot.deltaX;
          newY = end.y - pivot.deltaY;
        }
        break;
    }

    this.setState({
      x: newX || x,
      y: newY || y,
      width: newWidth || width,
      height: newHeight || height
    });

    edit({
      ...target,
      x: newX || x,
      y: newY || y,
      width: newWidth || width,
      height: newHeight || height
    });
  }

  commit() {
    // connect to higher components
    // log in history
    this.setState({
      isDragging: false,
      start: null,
      end: null,
      pivot: null,
      direction: null
    });
  }

  render() {
    const { id, horizontal, vertical } = this.props;
    const { x, y, width, height, isDragging, direction } = this.state;

    return (
      <>
        <Wrapper
          id={id}
          x={x}
          y={y}
          width={width}
          height={height}
          onMouseDown={this.handleMoveStart}
          onMouseUp={this.handleMoveEnd}
          onMouseMove={this.handleMouseMove}
          direction={isDragging ? direction : null}
        >
          {horizontal ? (
            <>
              <Left
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.left}
              />
              <Right
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.right}
              />
            </>
          ) : null}

          {vertical ? (
            <>
              <Top
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.top}
              />
              <Bottom
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.bottom}
              />
            </>
          ) : null}

          {horizontal && vertical ? (
            <>
              <TopLeft
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.topLeft}
              />
              <TopRight
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.topRight}
              />
              <BottomLeft
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.bottomLeft}
              />
              <BottomRight
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                value={EDITOR.bottomRight}
              />
            </>
          ) : null}
        </Wrapper>
        <EditArea
          direction={isDragging ? direction : null}
          onMouseMove={this.handleMouseMove}
        />
      </>
    );
  }
}

Editor.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  horizontal: PropTypes.bool.isRequired,
  vertical: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired
};

export default Editor;
