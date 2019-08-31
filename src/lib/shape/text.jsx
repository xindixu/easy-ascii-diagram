import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { WithBackground } from "./style";
import { TOOLS } from "../../constants";

class Text extends Component {
  static shape = TOOLS.text;

  static convert(content) {
    return content;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { content, ...rest } = nextProps;
    if (prevState.content === content) return { ...nextProps };
    const state = {
      ...rest,
      text: Text.convert(content)
    };
    return state;
  }

  constructor(props) {
    super(props);
    const { content } = this.props;
    this.state = {
      ...this.props,
      text: Text.convert(content)
    };
  }

  render() {
    const { text } = this.state;
    const { x, y, zoomLevel, handleOnDoubleClick, editing } = this.props;

    return (
      <WithBackground
        x={x}
        y={y}
        zoomLevel={zoomLevel}
        onDoubleClick={handleOnDoubleClick}
        editing={editing}
      >
        {text}
      </WithBackground>
    );
  }
}

Text.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  handleOnDoubleClick: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default editable(Text);
