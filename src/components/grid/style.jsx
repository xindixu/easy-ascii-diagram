import styled from 'styled-components';
import { TOOLBAR_HEIGHT } from '../../constants';

import { styleSettings } from '../../assets/styles/settings';

const { pink, borderWidthMd } = styleSettings;

export const GridBackground = styled.div`
  position: absolute;
  top: ${TOOLBAR_HEIGHT}px;
  left: 0;
  border-right: ${pink} solid ${borderWidthMd};
  border-bottom: ${pink} solid ${borderWidthMd};
  ${props => `background-size: ${props.width}px ${props.height}px`}
  height: calc(100vh - ${TOOLBAR_HEIGHT}px);
  width: 100vw;
  background-color: white;
  background-image: linear-gradient(${pink} ${borderWidthMd}, transparent ${borderWidthMd}),
                  linear-gradient(90deg, ${pink} ${borderWidthMd}, transparent ${borderWidthMd});

`;
