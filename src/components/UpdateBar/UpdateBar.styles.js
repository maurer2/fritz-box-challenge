import styled, { css } from 'styled-components/macro';

export const UpdateBar = styled.aside`
  grid-area: updateBar;
  will-change: transform;
  transform: translateY(0);
  transition: transform 500ms ease-out;
  background: ${({ theme }) => theme.secondaryColor};
  text-align: center;

  ${({ isUpdating }) => !isUpdating && css`
    transform: translateY(-100%);
  `}
`;

export const Text = styled.div`
  padding: 1rem;
  font-size: 1rem;
`;
