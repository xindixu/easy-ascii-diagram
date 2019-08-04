/* eslint-disable no-case-declarations */
import {
  GRID_WIDTH, GRID_HEIGHT, TOOLS, DIRECTION,
} from '../constants';

const offsetX = x => (x - 1) * GRID_WIDTH + GRID_WIDTH / 2;
const offsetY = y => (y - 1) * GRID_HEIGHT + GRID_HEIGHT / 2;

const drawRect = (ctx, _x, _y, width, height) => {
  console.log(_x, _y);
  ctx.strokeRect(offsetX(_x), offsetY(_y), width * GRID_WIDTH, height * GRID_HEIGHT);
};

const drawLine = (ctx, _x, _y, length, direction) => {
  const x = offsetX(_x);
  const y = offsetY(_y);
  ctx.beginPath();
  ctx.moveTo(x, y);
  if (direction === DIRECTION.horizontal) {
    ctx.lineTo(x + length * GRID_WIDTH, y);
  } else {
    ctx.lineTo(x, y + length * GRID_HEIGHT);
  }
  ctx.stroke();
};


export default function draw(ctx, type, props) {
  if (type === TOOLS.rectangle) {
    const {
      x, y, width, height,
    } = props;

    try {
      drawRect(ctx, x, y, width, height);
    } catch (error) {
      console.error(error);
    }
  }

  if (type === TOOLS.line) {
    const {
      x, y, length, direction,
    } = props;
    try {
      drawLine(ctx, x, y, length, direction);
    } catch (error) {
      console.error(error);
    }
  }

  if (type === TOOLS.arrow) {
    const {
      x, y, length, direction,
    } = props;
    try {
      drawLine(ctx, x, y, length, direction);
    } catch (error) {
      console.error(error);
    }
  }

  if (type === TOOLS.text) {
    const {
      x, y, length, direction,
    } = props;
    try {
      drawLine(ctx, x, y, length, direction);
    } catch (error) {
      console.error(error);
    }
  }

  if (type === TOOLS.eraser) {
    const {
      x, y, length, direction,
    } = props;
    try {
      drawLine(ctx, x, y, length, direction);
    } catch (error) {
      console.error(error);
    }
  }
}
