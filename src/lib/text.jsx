import React, { Component } from "react";
import PropTypes from "prop-types";
import { Content } from "./style";
import { TOOLS } from "../constants";

class Text extends Component {
  static shape = TOOLS.Text;

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
    const { content } = this.props;
    const text = Text.convert(content);
    this.setState({ text });
  }

  render() {
    const { x, y, text } = this.state;
    return (
      <Content x={x} y={y}>
        {text}
      </Content>
    );
  }
}

Text.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
};

export default Text;
