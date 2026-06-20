import styled, { css } from 'styled-components';

export const InfoBarWrapper = styled.div<{ $isActive: boolean }>`
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.secondaryColor};

  ${({ $isActive }) =>
    $isActive
      ? css`
          padding: 1rem;
        `
      : css`
          block-size: 1px;
          inline-size: 1px;
          padding: 0;
          margin: -1px;
          overflow: clip;
          white-space: nowrap;
          border: 0;
          clip-path: inset(50%);
        `}
`;
