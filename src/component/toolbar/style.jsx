import styled from 'styled-components';

export const Wrapper = styled.nav`
  display: inline-flex;
  justify-content: space-around;
  height: 2rem;
  width: 100%;
  border: 1px solid #222;
  background: #ccc;
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
