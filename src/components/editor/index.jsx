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
  state = {
    isDragging: false,
    start: null,
    end: null,
    direction: null
  };

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
      end: { x: getX(e.clientX), y: getY(e.clientY) }
    });
    this.commit();
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

  edit() {
    const { edit, target } = this.props;
    const { start, end, direction } = this.state;
    const { length, width, height } = target;
    // let newLength;
    // let newWidth;
    // let newHeight;
    // let x;
    // let y;

    // switch (direction) {
    //   case EDITOR.left:
    //     newLength = length + end.x - start.x;
    //     newWidth = width + end.x - start.x;
    //     break;
    //   case EDITOR.right:
    //     newLength = length + end.x - start.x;
    //     newWidth = width + end.x - start.x;
    //     break;
    //   case EDITOR.top:
    //     newLength = length + end.y - start.y;
    //     newHeight = height + end.y - start.y;
    //     break;
    //   case EDITOR.bottom:
    //     newLength = length + end.y - start.y;
    //     newHeight = height + end.y - start.y;
    //     break;
    //   case EDITOR.topLeft:
    //     newWidth = width + end.x - start.x;
    //     newHeight = height + end.y - start.y;
    //     break;
    //   case EDITOR.topRight:
    //     break;
    //   case EDITOR.bottomLeft:
    //     break;
    //   case EDITOR.bottomRight:
    //     break;
    //   default:
    //     break;
    // }

    edit({ ...target, editing: { start, end } });
    // if (length) edit({ ...target, length: newLength });
    // if (width && newWidth) edit({ ...target, width: newWidth });
    // if (height && newHeight) edit({ ...target, height: newHeight });
  }

  commit() {
    const { start, end } = this.state;
  }

  render() {
    const { x, y, width, height, id, horizontal, vertical } = this.props;

    return (
      <>
        <EditArea
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        />
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
