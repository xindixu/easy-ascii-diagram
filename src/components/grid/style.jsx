import styled from 'styled-components';
import { TOOLBAR_HEIGHT } from '../../constants';

import { styleSettings } from '../../assets/styles/settings';

const { pink, borderWidth } = styleSettings;

export const GridBackground = styled.div`
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
  border-right: ${pink} solid ${borderWidth};
  border-bottom: ${pink} solid ${borderWidth};
  ${props => `background-size: ${props.width}px ${props.height}px`}
  height: calc(100vh - ${TOOLBAR_HEIGHT}px);
  width: 100vw;
  background-color: white;
  background-image: linear-gradient(${pink} ${borderWidth}, transparent ${borderWidth}),
                  linear-gradient(90deg, ${pink} ${borderWidth}, transparent ${borderWidth});

`;
