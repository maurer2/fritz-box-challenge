import styled from 'styled-components';

export const SlideMasterWrapper = styled.main`
  place-content: center; // works without grid
  inline-size: 100dvw;
  block-size: stretch; // will be prefixed
  overflow: clip;
`;
