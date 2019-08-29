import { GRID_HEIGHT, GRID_WIDTH } from "./constants";

export const randomId = () =>
  `SK${Math.random()
    .toString(36)
    .substring(2, 8)}`;

export const getX = x => Math.ceil(x / GRID_WIDTH);

export const getY = y => Math.ceil(y / GRID_HEIGHT) - 1;
