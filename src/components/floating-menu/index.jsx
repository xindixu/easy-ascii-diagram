import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./style";

class FloatingMenu extends Component {
  moveLay;

  render() {
    return <Wrapper>{this.props.children}</Wrapper>;
  }
}

FloatingMenu.propTypes = {};

export default FloatingMenu;
