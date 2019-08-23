import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditBox } from "./style";
import { TOOLS } from "../constants";

const randomId = () =>
  Math.random()
    .toString(36)
    .substring(2, 8);

function editable(WrappedComponent) {
  return class extends Component {
    state = {
      editing: false,
      x: null,
      top: null,
      width: null,
      height: null,
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
      const { x, y } = this.props;
      this.setState({ editing: true, x, y, width, height });
      window.addEventListener("click", this.handleClick);
    };

    render() {
      const { editing, x, y, width, height, id } = this.state;

      return (
        <>
          <WrappedComponent
            enterEditMode={this.handleOnDoubleClick}
            {...this.props}
          />
          {editing ? (
            <EditBox id={id} x={x} y={y} width={width} height={height} />
          ) : null}
        </>
      );
    }
  };
}
export default editable;
