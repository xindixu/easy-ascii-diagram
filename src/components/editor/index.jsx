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
      direction: null,
      ...props
    };
  }

  handleMouseDown = e => {
    this.setState({
      isDragging: true,
      start: { x: getX(e.clientX), y: getY(e.clientY) },
      end: { x: getX(e.clientX), y: getY(e.clientY) },
      direction: e.target.value
    });
  };

  handleMouseUp = e => {
    this.setState({
      isDragging: false,
      end: { x: getX(e.clientX), y: getY(e.clientY) }
    });
    this.commit();
  };

  handleMouseMove = e => {
    const { isDragging } = this.state;
    console.log(getX(e.clientX), getY(e.clientY));
    if (isDragging === true) {
      this.setState({
        end: { x: getX(e.clientX), y: getY(e.clientY) }
      });
      this.edit();
    }
  };

  edit() {
    const { edit, target } = this.props;
    const { start, end, direction, x, y, width, height } = this.state;
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
    const { start, end } = this.state;
  }

  render() {
    const { id, horizontal, vertical } = this.props;
    const { x, y, width, height } = this.state;

    return (
      <>
        <Wrapper id={id} x={x} y={y} width={width} height={height}>
          {horizontal ? (
            <>
              <Left onMouseDown={this.handleMouseDown} value={EDITOR.left} />
              <Right onMouseDown={this.handleMouseDown} value={EDITOR.right} />
            </>
          ) : null}

          {vertical ? (
            <>
              <Top onMouseDown={this.handleMouseDown} value={EDITOR.top} />
              <Bottom
                onMouseDown={this.handleMouseDown}
                value={EDITOR.bottom}
              />
            </>
          ) : null}

          {horizontal && vertical ? (
            <>
              <TopLeft
                onMouseDown={this.handleMouseDown}
                value={EDITOR.topLeft}
              />
              <TopRight
                onMouseDown={this.handleMouseDown}
                value={EDITOR.topRight}
              />
              <BottomLeft
                onMouseDown={this.handleMouseDown}
                value={EDITOR.bottomLeft}
              />
              <BottomRight
                onMouseDown={this.handleMouseDown}
                value={EDITOR.bottomRight}
              />
            </>
          ) : null}
        </Wrapper>
        <EditArea
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
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
