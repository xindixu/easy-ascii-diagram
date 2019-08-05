import styled from 'styled-components';

import {
  GRID_WIDTH, GRID_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, TOOLBAR_HEIGHT,
} from '../../constants';

export const Wrapper = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
`;

export const Content = styled.code`
  font-family: monospace;
  font-size: ${GRID_WIDTH * 1.2}px;
  line-height: ${GRID_HEIGHT}px;
  letter-spacing: 2.25px;
  vertical-align: text-top
  margin: 0;
  padding: 0;
  position: absolute;
  ${props => `left: ${props.x * GRID_WIDTH + GRID_WIDTH / 5}px; 
    top:${props.y * GRID_HEIGHT}px; `
}
`;
