import styled from 'styled-components';

export const InfoBarWrapper = styled.div`
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  padding: 1rem;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.secondaryColor};
`;

export const InfoBarWrapperInactive = styled(InfoBarWrapper)`
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: clip;
  white-space: nowrap;
  border: 0;
  clip-path: inset(50%);
`;
