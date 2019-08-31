import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";
import { GRID_WIDTH, GRID_HEIGHT, EDITOR } from "../../constants";

const { blue } = styleSettings;

const cursor = {
  [EDITOR.top]: "ns-resize",
  [EDITOR.bottom]: "ns-resize",
  [EDITOR.left]: "ew-resize",
  [EDITOR.right]: "ew-resize",
  [EDITOR.topLeft]: "nwse-resize",
  [EDITOR.topRight]: "nesw-resize",
  [EDITOR.bottomLeft]: "nesw-resize",
  [EDITOR.bottomRight]: "nwse-resize"
};

export const Wrapper = styled.div`
  // pointer-events: none;
  position: absolute;
  outline: 2px solid ${blue};
  z-index: 10;
  ${props => `width: ${props.width * GRID_WIDTH}px; 
  height: ${props.height * GRID_HEIGHT}px;
  left: ${props.x * GRID_WIDTH}px; 
  top:${props.y * GRID_HEIGHT}px; 
  `}
  cursor: move;
`;

export const EditArea = styled.div`
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2c2c2c08;
  ${props => (props.direction ? `cursor: ${cursor[props.direction]}` : null)}
`;

const Resizer = styled.button`
  pointer-events: initial;
  position: absolute;
  outline: none;
  background: #00000000;
  border: none;
`;

export const Top = styled(Resizer)`
  width: 100%;
  height: ${GRID_HEIGHT}px;
  max-height: calc(100% / 2);
  top: 0;
  left: 0;
  cursor: ${cursor[EDITOR.top]};
`;

export const Bottom = styled(Resizer)`
  width: 100%;
  height: ${GRID_HEIGHT}px;
  max-height: calc(100% / 2);
  bottom: 0;
  left: 0;
  cursor: ${cursor[EDITOR.bottom]};
`;

export const Left = styled(Resizer)`
  width: ${GRID_WIDTH}px;
  max-width: calc(100% / 2);
  height: 100%;
  top: 0;
  left: 0;
  cursor: ${cursor[EDITOR.left]};
`;

export const Right = styled(Resizer)`
  width: ${GRID_WIDTH}px;
  max-width: calc(100% / 2);
  height: 100%;
  top: 0;
  right: 0;
  cursor: ${cursor[EDITOR.right]};
`;

export const TopLeft = styled(Resizer)`
  width: ${GRID_WIDTH}px;
  max-width: calc(100% / 2);
  height: ${GRID_HEIGHT}px;
  max-height: calc(100% / 2);
  top: 0;
  left: 0;
  cursor: ${cursor[EDITOR.topLeft]};
`;

export const TopRight = styled(Resizer)`
  width: ${GRID_WIDTH}px;
  max-width: calc(100% / 2);
  height: ${GRID_HEIGHT}px;
  max-height: calc(100% / 2);
  top: 0;
  right: 0;
  cursor: ${cursor[EDITOR.topRight]};
`;

export const BottomLeft = styled(Resizer)`
  width: ${GRID_WIDTH}px;
  max-width: calc(100% / 2);
  height: ${GRID_HEIGHT}px;
  max-height: calc(100% / 2);
  bottom: 0;
  left: 0;
  cursor: ${cursor[EDITOR.bottomLeft]};
`;

export const BottomRight = styled(Resizer)`
  width: ${GRID_WIDTH}px;
  max-width: calc(100% / 2);
  height: ${GRID_HEIGHT}px;
  max-height: calc(100% / 2);
  bottom: 0;
  right: 0;
  cursor: ${cursor[EDITOR.bottomRight]};
`;
