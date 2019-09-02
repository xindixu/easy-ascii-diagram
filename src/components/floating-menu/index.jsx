import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./style";
import { EDITOR_COMMAND } from "../../constants";

class FloatingMenu extends Component {
  moveLay;

  render() {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}

FloatingMenu.propTypes = {};

export default FloatingMenu;
