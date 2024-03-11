import styled, { css } from 'styled-components';

import type { UpdateBarStyleProps } from './UpdateBar.types';

export const UpdateBar = styled.aside<UpdateBarStyleProps>`
  grid-area: updateBar;
  text-align: center;
  background: ${({ theme }) => theme.secondaryColor};
  transform: translateY(0);
  transition: transform 500ms ease-out;
  will-change: transform;
  ${({ $shouldShowUpdateBar }) => !$shouldShowUpdateBar
    && css`
      transform: translateY(-100%);
    `}
`;

export const Text = styled.div`
  padding: 1rem;
  font-size: 1rem;
`;
