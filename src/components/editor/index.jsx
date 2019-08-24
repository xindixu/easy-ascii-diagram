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

class Editor extends Component {
  state = {
    isDragging: false,
    start: null,
    end: null
  };

  handleMouseDown = e => {
    this.setState({
      isDragging: true,
      start: { x: getX(e.clientX), y: getY(e.clientY) },
      end: { x: getX(e.clientX), y: getY(e.clientY) }
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
    const { start, end } = this.state;
    const { length } = target;

    edit({ ...target, length: length + end.x - start.x });
  }

  commit() {
    const { start, end } = this.state;
    console.log(start, end);
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
              <Left onMouseDown={this.handleMouseDown} />
              <Right onMouseDown={this.handleMouseDown} />
            </>
          ) : null}

          {vertical ? (
            <>
              <Top onMouseDown={this.handleMouseDown} />
              <Bottom onMouseDown={this.handleMouseDown} />
            </>
          ) : null}

          {horizontal && vertical ? (
            <>
              <TopLeft onMouseDown={this.handleMouseDown} />
              <TopRight onMouseDown={this.handleMouseDown} />
              <BottomLeft onMouseDown={this.handleMouseDown} />
              <BottomRight onMouseDown={this.handleMouseDown} />
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
