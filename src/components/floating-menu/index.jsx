import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./style";

const FloatingMenu = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

FloatingMenu.propTypes = {
  children: PropTypes.any.isRequired
};

export default FloatingMenu;
