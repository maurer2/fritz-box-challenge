import styled from 'styled-components';

export const UpdateBarWrapper = styled.div`
  position: fixed;
  top: 0;
  inset-inline: 0;
  padding: 1rem;
  background: ${({ theme }) => theme.secondaryColor};
  font-weight: bold;
`;
