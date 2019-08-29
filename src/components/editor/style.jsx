import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";
import { GRID_WIDTH, GRID_HEIGHT } from "../../constants";

const { blue } = styleSettings;
export const Wrapper = styled.div`
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
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2c2c2c08;
`;

const Resizer = styled.button`
  position: absolute;
  outline: none;
  background: #00000000;
  border: none;
`;

export const Top = styled(Resizer)`
  width: 100%;
  height: ${GRID_HEIGHT / 2}px;
  top: 0;
  left: 0;
  cursor: ns-resize;
`;

export const Bottom = styled(Resizer)`
  width: 100%;
  height: ${GRID_HEIGHT / 2}px;
  bottom: 0;
  left: 0;
  cursor: ns-resize;
`;

export const Left = styled(Resizer)`
  width: ${GRID_WIDTH / 2}px;
  height: 100%;
  top: 0;
  left: 0;
  cursor: ew-resize;
`;

export const Right = styled(Resizer)`
  width: ${GRID_WIDTH / 2}px;
  height: 100%;
  top: 0;
  right: 0;
  cursor: ew-resize;
`;

export const TopLeft = styled(Resizer)`
  width: ${GRID_WIDTH / 2}px;
  height: ${GRID_HEIGHT / 2}px;
  top: 0;
  left: 0;
  cursor: nw-resize;
`;

export const TopRight = styled(Resizer)`
  width: ${GRID_WIDTH / 2}px;
  height: ${GRID_HEIGHT / 2}px;
  top: 0;
  right: 0;
  cursor: ne-resize;
`;

export const BottomLeft = styled(Resizer)`
  width: ${GRID_WIDTH / 2}px;
  height: ${GRID_HEIGHT / 2}px;
  bottom: 0;
  left: 0;
  cursor: sw-resize;
`;

export const BottomRight = styled(Resizer)`
  width: ${GRID_WIDTH / 2}px;
  height: ${GRID_HEIGHT / 2}px;
  bottom: 0;
  right: 0;
  cursor: se-resize;
`;
