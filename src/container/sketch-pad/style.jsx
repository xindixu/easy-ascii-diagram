import styled from 'styled-components';


import {
  CANVAS_WIDTH, CANVAS_HEIGHT, TOOLBAR_HEIGHT,
} from '../../constants';

export const Canvas = styled.canvas`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
`;
