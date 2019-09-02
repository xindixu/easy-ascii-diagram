import styled from "styled-components";
import { GRID_HEIGHT, GRID_WIDTH } from "../../constants";

export const TextArea = styled.textarea`
  resize: none;
  font-family: Courier, monospace;
`;

export const Border = styled.div`
  pointer-events: none;
  border: black solid 2px;
  position: absolute;
  z-index: 100;
  ${props =>
    `
    left: ${props.left * GRID_WIDTH}px;
    top: ${props.up * GRID_HEIGHT}px;
    width: ${(props.right - props.left) * GRID_WIDTH}px;
    height: ${(props.down - props.up + 1) * GRID_HEIGHT}px;
  `}
`;

export const Debug = styled.div`
  position: absolute;
  top: ${GRID_HEIGHT * 2}px;
  left: ${GRID_WIDTH * 2}px;
`;
