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
    if (nextProps !== prevState) {
      const { content } = nextProps;
      const state = {
        ...nextProps,
        text: Text.convert(content)
      };
      return state;
    }
    return null;
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
    const { x, y, text } = this.state;
    const { zoomLevel, handleOnDoubleClick } = this.props;

    return (
      <WithBackground
        x={x}
        y={y}
        zoomLevel={zoomLevel}
        onDoubleClick={handleOnDoubleClick}
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
  handleOnDoubleClick: PropTypes.func.isRequired
};

export default editable(Text);
