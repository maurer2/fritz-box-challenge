import styled from 'styled-components';

export const VisuallyHidden = styled.span`
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: clip;
  white-space: nowrap;
  clip-path: inset(50%);
`;
