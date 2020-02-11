import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";

const { pink, gray, borderWidth, radiusMd, spacer, zUI } = styleSettings;

export const Backdrop = styled.div`
  background: ${gray}99;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  z-index: ${zUI};
`;

export const Container = styled.div`
  background: white;
  border: ${pink} solid ${borderWidth};
  border-radius: ${radiusMd};
  padding: ${spacer};

  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: ${zUI};
`;

export const Button = styled.button`
  position: absolute;
  top: ${spacer};
  right: ${spacer};
  border: none;
`;

export const Header = styled.h1`
  font-size: ${spacer};
`;
