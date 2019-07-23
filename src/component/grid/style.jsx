import styled from 'styled-components';
import { styleSettings } from '../../assets/styles/settings';

const { pink } = styleSettings;

export const GridBackground = styled.div`
  ${props => `background-size: ${props.width}px ${props.height}px`}
  height: 100vh;
  width: 100vw;
  background-color: white;
  background-image: linear-gradient(${pink} 2px, transparent 2px),
                  linear-gradient(90deg, ${pink} 2px, transparent 2px),
                  linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px);
`;
