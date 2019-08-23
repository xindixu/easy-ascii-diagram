import React, { Component, forwardRef } from "react";
import PropTypes from "prop-types";
import { EditBox } from "./style";
import { randomId } from "../util";

function editable(WrappedComponent) {
  class Editable extends Component {
    state = {
      editing: false,
      x: null,
      y: null,
      width: null,
      height: null,
      id: randomId()
    };

    handleClick = e => {
      const { id } = this.state;
      if (e.target.closest(`#${id}`)) return;
      this.setState({ editing: false });
      window.removeEventListener("click", this.handleClick);
    };

    handleOnDoubleClick = e => {
      const { width, height } = e.target.getBoundingClientRect();
      const { x, y } = this.props;
      this.setState({ editing: true, x, y, width, height });
      window.addEventListener("click", this.handleClick);
    };

    render() {
      const { editing, x, y, width, height, id } = this.state;
      const { forwardedRef, ...rest } = this.props;

      return (
        <>
          <WrappedComponent
            enterEditMode={this.handleOnDoubleClick}
            ref={forwardedRef}
            {...rest}
          />
          {editing ? (
            <EditBox id={id} x={x} y={y} width={width} height={height} />
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
