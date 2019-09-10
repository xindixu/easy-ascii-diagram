import React from "react";
import PropTypes from "prop-types";
// import Rectangle from "./shape/rectangle";
// import Line from "./shape/line";
// import Arrow from "./shape/arrow";
// import Text from "./shape/text";
// import Eraser from "./shape/eraser";
import Shape from "./shape/shape";
import { randomId } from "../util";

import { DIRECTION_LINE, DIRECTION_ARROW, TOOLS } from "../constants";

const sharedProps = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  ref: PropTypes.shape({
    current: PropTypes.any.isRequired
  }).isRequired,
  enterEditMode: PropTypes.func.isRequired,
  exitEditMode: PropTypes.func.isRequired,
  commitEditing: PropTypes.func.isRequired,
  handleFloatingMenu: PropTypes.func.isRequired
};

export const drawRectangle = props => (
  <Shape shape={TOOLS.rectangle} {...props} />
);

drawRectangle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  ...sharedProps
};

export const drawLine = props => <Shape shape={TOOLS.line} {...props} />;

drawLine.propTypes = {
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_LINE)]).isRequired,
  ...sharedProps
};

export const drawArrow = props => <Shape shape={TOOLS.arrow} {...props} />;

drawArrow.propTypes = {
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_ARROW)]).isRequired,
  ...sharedProps
};

export const drawText = props => <Shape shape={TOOLS.text} {...props} />;

drawText.propTypes = {
  content: PropTypes.string.isRequired,
  ...sharedProps
};

export const erase = props => (
  <Shape shape={TOOLS.eraser} key={randomId()} {...props} />
);

erase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
};
