import styled from 'styled-components';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT, TOOLBAR_HEIGHT,
} from '../../constants';

export const Wrapper = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
  cursor: crosshair;
  font-family: Courier, monospace;
`;
