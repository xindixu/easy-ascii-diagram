import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";

const { pink, borderWidth, radiusMd, spacer, spacerSm } = styleSettings;

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
  z-index: 100;
`;

export const Button = styled.button`
  position: absolute;
  top: ${spacer};
  right: ${spacer};
`;

export const Header = styled.h1`
  font-size: ${spacer};
`;
