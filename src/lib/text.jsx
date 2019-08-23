import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "./editable";
import { WithBackground } from "./style";
import { TOOLS } from "../constants";

class Text extends Component {
  static shape = TOOLS.text;

  state = {
    x: this.props.x,
    y: this.props.y,
    content: this.props.content,
    text: ""
  };

  componentDidMount() {
    const { content } = this.state;
    const text = this.convert(content);
    this.setState({ text });
  }

  convert() {
    const { content } = this.state;
    return content;
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
  zoomLevel: PropTypes.number.isRequired
};

export default editable(Text);

export const drawText = ({ x, y, content, id, ref, zoomLevel }) => {
  return (
    <Text
      key={id}
      ref={ref}
      x={x}
      y={y}
      content={content}
      zoomLevel={zoomLevel}
    />
  );
};

drawText.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  ref: PropTypes.shape({
    current: PropTypes.any.isRequired
  }).isRequired
};
