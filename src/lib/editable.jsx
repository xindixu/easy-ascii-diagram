import React, { Component, forwardRef } from "react";
import PropTypes from "prop-types";
import Editor from "../components/editor";
import { randomId } from "../util";
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from "../constants";

function editable(WrappedComponent) {
  class Editable extends Component {
    state = {
      editing: false,
      x: null,
      y: null,
      width: null,
      height: null,
      horizontal: false,
      vertical: false,
      id: randomId()
    };

    componentDidMount() {}

    handleClick = e => {
      const { id } = this.state;
      if (e.target.closest(`#${id}`)) return;
      this.setState({ editing: false });
      window.removeEventListener("click", this.handleClick);
    };

    handleOnDoubleClick = e => {
      const { width, height } = e.target.getBoundingClientRect();
      const { x, y, forwardedRef } = this.props;
      const { direction } = forwardedRef.current.state;

      let horizontal;
      let vertical;
      if (Object.values(DIRECTION_HORIZONTAL).includes(direction)) {
        horizontal = true;
        vertical = false;
      } else if (Object.values(DIRECTION_VERTICAL).includes(direction)) {
        horizontal = false;
        vertical = true;
      } else {
        horizontal = true;
        vertical = true;
      }

      console.log(vertical, horizontal);
      this.setState({
        editing: true,
        x,
        y,
        width,
        height,
        horizontal,
        vertical
      });

      window.addEventListener("click", this.handleClick);
    };

    render() {
      const {
        editing,
        x,
        y,
        width,
        height,
        horizontal,
        vertical,
        id
      } = this.state;
      const { forwardedRef, ...rest } = this.props;

      return (
        <>
          <WrappedComponent
            enterEditMode={this.handleOnDoubleClick}
            ref={forwardedRef}
            {...rest}
          />
          {editing ? (
            <Editor
              id={id}
              x={x}
              y={y}
              width={width}
              height={height}
              horizontal={horizontal}
              vertical={vertical}
            />
          ) : null}
        </>
      );
    }
  }

  Editable.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    forwardedRef: PropTypes.shape({
      current: PropTypes.any
    }).isRequired
  };

  return forwardRef((props, ref) => <Editable {...props} forwardedRef={ref} />);
}

export default editable;
