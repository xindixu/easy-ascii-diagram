import React, { Component } from "react";
import PropTypes from "prop-types";
import editable from "../editable";
import { WithBackground } from "./style";
import { TOOLS } from "../../constants";

class Text extends Component {
  static convert(content) {
    return content;
  }

  static getWidthHeight = content => {
    const array = content.split("\n");
    const height = array.length;
    const width = array.reduce((a, b) => (a.length > b.length ? a : b)).length;

    return { width, height };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { content, ...rest } = nextProps;
    if (prevState.content === content) return { ...nextProps };
    const { width, height } = Text.getWidthHeight(content);

    const state = {
      ...rest,
      width,
      height,
      text: Text.convert(content)
    };
    return state;
  }

  constructor(props) {
    super(props);
    const { content } = this.props;

    const { width, height } = Text.getWidthHeight(content);
    this.state = {
      ...this.props,
      width,
      height,
      text: Text.convert(content)
    };
    this.shape = TOOLS.text;
  }

  updateWithState = state => {
    const { content } = state;
    const { update } = this.props;
    const text = Text.convert(content);
    this.setState({ ...state, text });
    update(state);
  };

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
  update: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default editable(Text);
