import styled from 'styled-components';
import { styleSettings } from '../assets/styles/settings';
import {
  GRID_WIDTH, GRID_HEIGHT,
} from '../constants';

const { yellow } = styleSettings;

export const Content = styled.code`
  pointer-events: none;
  white-space: pre-wrap;
  display: inline;
  font-family: Courier, monospace;
  letter-spacing: 4.8px;
  font-size: ${GRID_WIDTH}px;
  line-height: ${GRID_HEIGHT / 0.979}px;
  background: ${yellow};
  margin: 0;
  padding: 0;
  position: absolute;
  ${props => `left: ${props.x * GRID_WIDTH}px; 
    top:${props.y * GRID_HEIGHT}px; 
    width: ${props.width * GRID_WIDTH}px;
    height:${props.height * GRID_HEIGHT}px;
  `
}
`;
