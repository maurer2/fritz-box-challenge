import styled from 'styled-components';

export const InfoBarWrapper = styled.div`
  position: fixed;
  top: 0;
  inset-inline: 0;
  padding: 1rem;
  background: ${({ theme }) => theme.secondaryColor};
  font-weight: bold;
`;

export const InfoBarWrapperInactive = styled(InfoBarWrapper)`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: clip;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
