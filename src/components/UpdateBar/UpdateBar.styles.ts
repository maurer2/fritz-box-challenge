import styled from 'styled-components';

export const UpdateBarWrapper = styled.div`
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  padding: 1rem;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.secondaryColor};
`;
