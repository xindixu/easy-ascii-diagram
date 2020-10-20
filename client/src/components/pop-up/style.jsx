import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";
import BaseButton from "../button";

const {
  pink,
  gray,
  borderWidth,
  spacerLg,
  radiusMd,
  spacerSm,
  spacer,
  zUI,
} = styleSettings;

export const Backdrop = styled.div`
  background: ${gray}99;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
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

export const Button = styled(BaseButton)`
  position: absolute;
  top: ${spacerSm};
  right: ${spacerSm};
  width: ${spacerLg};
  margin: 0;
  border-radius: 99rem;
`;

export const Header = styled.h1`
  font-size: ${spacer};
`;
