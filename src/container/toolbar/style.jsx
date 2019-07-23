import styled from 'styled-components';

import { styleSettings } from '../../assets/styles/settings';

const {
  spacerXs, spacerSm, spacerXxl, radiusSm, gray,
} = styleSettings;

export const Wrapper = styled.nav`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  
  height: ${spacerXxl};
  width: 100%;
  background: ${gray};
`;

const Container = styled.div`
  text-align: center;

`;

export const Tool = styled(Container)`
  flex: 33%;
`;
export const Command = styled(Container)`
  flex: 33%;
`;
export const Action = styled(Container)`
  flex: 33%;
`;

const Button = styled.button`
  padding: ${spacerSm};
  margin: ${spacerXs};
  border-radius: ${radiusSm};
`;

export const IconButton = styled(Button)`
`;
