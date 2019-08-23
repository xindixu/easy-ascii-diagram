export const TOOLS = {
  rectangle: "RECTANGLE",
  line: "LINE",
  arrow: "ARROW",
  text: "TEXT",
  eraser: "ERASER"
};
export const TOOLS_DRAWING = {
  rectangle: TOOLS.rectangle,
  line: TOOLS.line,
  arrow: TOOLS.arrow,
  text: TOOLS.text
};

export const ZOOM = {
  zoomIn: "ZOOM_IN",
  zoomOut: "ZOOM_OUT"
};

export const COMMANDS = {
  undo: "UNDO",
  redo: "REDO"
};

export const ACTIONS = {
  export: "EXPORT",
  save: "SAVE"
};

export const TOOLBAR_HEIGHT = 32;
export const GRID_HEIGHT = 32;
export const GRID_WIDTH = 16;

export const CANVAS_HEIGHT = window.innerHeight - TOOLBAR_HEIGHT;
export const CANVAS_WIDTH = window.innerWidth;

export const DIRECTION = {
  horizontal: "HORIZONTAL",
  vertical: "VERTICAL",
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT"
};

export const DIRECTION_LINE = {
  horizontal: DIRECTION.horizontal,
  vertical: DIRECTION.vertical
};

export const DIRECTION_ARROW = {
  up: DIRECTION.up,
  down: DIRECTION.down,
  left: DIRECTION.left,
  right: DIRECTION.right
};
