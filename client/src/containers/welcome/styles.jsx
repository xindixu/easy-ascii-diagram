import styled from "styled-components";
import { styleSettings } from "../../assets/styles/settings";

const {
  pink,
  yellow,
  spacerSm,
  spacerMd,
  radiusSm,
  sizeXl,
  sizeXs
} = styleSettings;

export const Button = styled.button`
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.8
  `}
  display: block;
  padding: ${spacerSm};
  margin: ${spacerMd} auto;
  border-radius: ${radiusSm};
  background: ${props => (props.active ? pink : "auto")};

  &:focus {
    outline: 2px solid ${yellow};
  }
  &:hover {
    background: ${pink};
    cursor: pointer;
  }
`;

export const Input = styled.input`
  display: flex;
  align-self: center;
  text-align: center;

  height: ${sizeXs};
  width: ${sizeXl};
  padding: ${spacerSm};
  margin: ${spacerMd};

  border-radius: ${radiusSm};
  border: 2px solid ${pink};

  &:focus {
    outline: 3px solid ${pink};
  }
`;
