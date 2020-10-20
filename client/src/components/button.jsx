import styled from "styled-components";
import { styleSettings } from "../assets/styles/settings";

const {
  pink,
  yellow,
  blue,
  gray,
  spacerLg,
  spacerSm,
  spacerMd,
  radiusSm,
} = styleSettings;

const Button = styled.button`
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.8;
  `}
  border: 1px solid black;
  display: block;
  padding: ${spacerSm};
  margin: ${spacerMd} auto;
  border-radius: ${radiusSm};
  height: ${spacerLg};
  background: ${(props) => (props.active ? pink : blue)};

  &:focus {
    outline: 2px solid ${yellow};
  }
  &:hover {
    background: ${pink};
    cursor: pointer;
  }
`;

export default Button;
