import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "./editable";
import { WithBackground } from "./style";
import { TOOLS } from "../constants";

class Text extends Component {
  static shape = TOOLS.text;

  static convert(content) {
    return content;
  }

  state = {
    x: this.props.x,
    y: this.props.y,
    content: this.props.content,
    text: ""
  };

  componentDidMount() {
    const { content } = this.state;
    const text = Text.convert(content);
    this.setState({ text });
  }

  render() {
    const { x, y, text } = this.state;
    const { zoomLevel, enterEditMode } = this.props;

    return (
      <WithBackground
        x={x}
        y={y}
        zoomLevel={zoomLevel}
        onDoubleClick={enterEditMode}
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
  enterEditMode: PropTypes.func.isRequired
};

export default editable(Text);
