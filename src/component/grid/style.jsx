import styled from 'styled-components';
import { TOOLBAR_HEIGHT } from '../../constants';

import { styleSettings } from '../../assets/styles/settings';

const { pink } = styleSettings;

export const GridBackground = styled.div`
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
  ${props => `background-size: ${props.width}px ${props.height}px`}
  height: calc(100vh - 2em);
  width: 100vw;
  background-color: white;
  background-image: linear-gradient(${pink} 2px, transparent 2px),
                  linear-gradient(90deg, ${pink} 2px, transparent 2px),
                  linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px);
`;
