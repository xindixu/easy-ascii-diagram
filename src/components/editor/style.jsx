import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";
import { GRID_WIDTH, GRID_HEIGHT } from "../../constants";

const { blue } = styleSettings;
export const Wrapper = styled.div`
  pointer-event: none;
  position: absolute;
  outline: 2px solid ${blue};
  z-index: 100;
  ${props => `width: ${props.width}px; 
  height: ${props.height}px;
  left: ${props.x * GRID_WIDTH}px; 
    top:${props.y * GRID_HEIGHT}px; 
  `}
`;

const Resizer = styled.span`
  position: absolute;
  border: 0.4px solid black;
`;

export const Top = styled(Resizer)`
  width: 100%;
  height: 2px;
  top: -1px;
  left: 0px;
  cursor: row-resize;
`;

export const Bottom = styled(Resizer)`
  width: 100%;
  height: 2px;
  bottom: -1px;
  left: 0px;
  cursor: row-resize;
`;

export const Left = styled(Resizer)`
  width: 2px;
  height: 100%;
  top: 0px;
  left: -1px;
  cursor: col-resize;
`;

export const Right = styled(Resizer)`
  width: 2px;
  height: 100%;
  top: 0px;
  right: -1px;
  cursor: col-resize;
`;

export const TopLeft = styled(Resizer)`
  width: 2px;
  height: 2px;
  top: -1px;
  left: -1px;
  cursor: nw-resize;
`;

export const TopRight = styled(Resizer)`
  width: 2px;
  height: 2px;
  top: -1px;
  right: -1px;
  cursor: ne-resize;
`;

export const BottomLeft = styled(Resizer)`
  width: 2px;
  height: 2px;
  bottom: -1px;
  left: -1px;
  cursor: sw-resize;
`;

export const BottomRight = styled(Resizer)`
  width: 2px;
  height: 2px;
  bottom: -1px;
  right: -1px;
  cursor: se-resize;
`;
