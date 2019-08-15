import styled from 'styled-components';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT, TOOLBAR_HEIGHT, TOOLS,
} from '../../constants';

export const Wrapper = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
  font-family: Courier, monospace;
  cursor: ${props => (props.tool === TOOLS.text ? 'text' : 'crosshair')} ;
`;
