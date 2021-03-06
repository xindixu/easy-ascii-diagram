import React from "react";
import PropTypes from "prop-types";
import Rectangle from "./shape/rectangle";
import Line from "./shape/line";
import Arrow from "./shape/arrow";
import Text from "./shape/text";
import Eraser from "./shape/eraser";

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
  <Rectangle shape={TOOLS.rectangle} {...props} />
);

drawRectangle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  ...sharedProps
};

export const drawLine = props => <Line shape={TOOLS.line} {...props} />;

drawLine.propTypes = {
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_LINE)]).isRequired,
  ...sharedProps
};

export const drawArrow = props => <Arrow shape={TOOLS.arrow} {...props} />;

drawArrow.propTypes = {
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_ARROW)]).isRequired,
  ...sharedProps
};

export const drawText = props => <Text shape={TOOLS.text} {...props} />;

drawText.propTypes = {
  content: PropTypes.string.isRequired,
  ...sharedProps
};

export const erase = props => (
  <Eraser shape={TOOLS.eraser} key={randomId()} {...props} />
);

erase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export const drawShape = props => {
  const { shape } = props;

  switch (shape) {
    case TOOLS.rectangle:
      return drawRectangle(props);
    case TOOLS.arrow:
      return drawArrow(props);
    case TOOLS.line:
      return drawLine(props);
    case TOOLS.text:
      return drawText(props);
    default:
      return null;
  }
};
