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
  font-size: ${GRID_WIDTH / 0.6}px;
  line-height: ${GRID_HEIGHT * 1.03}px;
  box-shadow: inset ${GRID_WIDTH}px 0px 0px ${yellow},
              inset -${GRID_WIDTH}px 0px 0px ${yellow},
              inset 0 ${GRID_HEIGHT}px 0px ${yellow},
              inset 0 -${GRID_HEIGHT}px 0px ${yellow};
  margin: 0;
  padding: 0;
  position: absolute;
  ${props => `left: ${props.x * GRID_WIDTH}px; 
    top:${props.y * GRID_HEIGHT}px; 
  `}
`;
