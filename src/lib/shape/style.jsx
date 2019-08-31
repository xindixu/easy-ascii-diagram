import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";
import { GRID_WIDTH, GRID_HEIGHT } from "../../constants";

const { yellow, pink, borderWidth, zTop, zBase } = styleSettings;

const Base = styled.code.attrs(({ x, y, editing }) => ({
  style: {
    left: x * GRID_WIDTH,
    top: y * GRID_HEIGHT,
    zIndex: editing ? zTop : zBase,
    opacity: editing ? 0.8 : 1
  }
}))`
  user-select: none;
  white-space: pre;
  display: inline;
  font-family: Courier, monospace;
  font-size: ${GRID_WIDTH / 0.6}px;
  line-height: ${GRID_HEIGHT * 1.03}px;
  margin: 0;
  padding: 0;
  position: absolute;
`;

export const WithGrid = styled(Base)`
  background-color: white;
  background-image: linear-gradient(
      ${pink} ${borderWidth},
      transparent ${borderWidth}
    ),
    linear-gradient(90deg, ${pink} ${borderWidth}, transparent ${borderWidth});

  ${props => `
    background-size: ${GRID_WIDTH / props.zoomLevel}px ${GRID_HEIGHT /
    props.zoomLevel}px
  `}
`;

export const BorderOnly = styled(WithGrid)`
  box-shadow: inset ${GRID_WIDTH}px 0px 0px ${yellow},
    inset -${GRID_WIDTH}px 0px 0px ${yellow},
    inset 0 ${GRID_HEIGHT}px 0px ${yellow},
    inset 0 -${GRID_HEIGHT}px 0px ${yellow};
`;

export const WithBackground = styled(Base)`
  background-color: ${yellow};
`;

export const NoBackground = styled(WithGrid)``;
