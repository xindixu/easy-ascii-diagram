import React from "react";
import PropTypes from "prop-types";
import Rectangle from "./shape/rectangle";
import Line from "./shape/line";
import Arrow from "./shape/arrow";
import Text from "./shape/text";
import Eraser from "./shape/eraser";
import { randomId } from "../util";
import { DIRECTION_LINE, DIRECTION_ARROW } from "../constants";

export const drawRectangle = ({ x, y, width, height, key, ref, zoomLevel }) => (
  <Rectangle
    key={key}
    ref={ref}
    x={x}
    y={y}
    width={width}
    height={height}
    zoomLevel={zoomLevel}
  />
);

drawRectangle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  ref: PropTypes.shape({
    current: PropTypes.any.isRequired
  }).isRequired
};

export const drawLine = ({ x, y, length, direction, key, ref, zoomLevel }) => (
  <Line
    key={key}
    ref={ref}
    x={x}
    y={y}
    length={length}
    direction={direction}
    zoomLevel={zoomLevel}
  />
);

drawLine.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_LINE)]).isRequired,
  zoomLevel: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  ref: PropTypes.shape({
    current: PropTypes.any.isRequired
  }).isRequired
};

export const drawArrow = ({ x, y, length, direction, key, ref, zoomLevel }) => (
  <Arrow
    key={key}
    ref={ref}
    x={x}
    y={y}
    length={length}
    direction={direction}
    zoomLevel={zoomLevel}
  />
);

drawArrow.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([...Object.values(DIRECTION_ARROW)]).isRequired,
  zoomLevel: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  ref: PropTypes.shape({
    current: PropTypes.any.isRequired
  }).isRequired
};

export const erase = ({ x, y, width, height, zoomLevel }) => (
  <Eraser
    key={randomId()}
    x={x}
    y={y}
    width={width}
    height={height}
    zoomLevel={zoomLevel}
  />
);

erase.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export const drawText = ({ x, y, content, key, ref, zoomLevel }) => {
  return (
    <Text
      key={key}
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
  key: PropTypes.string.isRequired,
  ref: PropTypes.shape({
    current: PropTypes.any.isRequired
  }).isRequired
};
