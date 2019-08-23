import styled from "styled-components";
import { TOOLBAR_HEIGHT, TOOLS } from "../../constants";

export const Wrapper = styled.div`
  height: calc(100vh - ${TOOLBAR_HEIGHT}px);
  width: 100vw;
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
  font-family: Courier, monospace;
  cursor: ${props => (props.tool === TOOLS.text ? "text" : "crosshair")};

  &:focus {
    outline: none;
  }
`;
