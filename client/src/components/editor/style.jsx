import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";
import { GRID_WIDTH, GRID_HEIGHT, EDITOR } from "../../constants";

const { blue, zToppest } = styleSettings;

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

export const Wrapper = styled.div.attrs(({ x, y, width, height }) => ({
  style: {
    left: x * GRID_WIDTH,
    top: y * GRID_HEIGHT,
    width: width * GRID_WIDTH,
    height: height * GRID_HEIGHT
  }
}))`
  position: absolute;
  outline: 2px solid ${blue};
  z-index: ${zToppest};
  cursor: move;
`;

export const EditArea = styled.div`
  background: #2c2c2c08;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zToppest - 2};
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