import styled from 'styled-components';

export const SlideMasterWrapper = styled.main`
  place-content: center; // works without grid
  place-self: center; // works without grid
  inline-size: min(100dvw, 2000px);
  block-size: stretch; // will be vendor prefixed
  overflow: clip;
  view-transition-name: slide-master;
`;
