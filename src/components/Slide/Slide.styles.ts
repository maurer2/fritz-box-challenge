import styled from 'styled-components';

export const SlideWrapper = styled.dl`
  margin: 0;
  color: ${({ theme }) => theme.colors.primaryColor};
  user-select: none;
`;

export const SlideTitle = styled.dt`
  margin-block: 0;
  margin-inline: max(1rem, 30%);
  font-weight: bold;
`;

export const SlideText = styled.dd`
  margin-block: 0;
  margin-inline: max(1rem, 15%);
`;

// needs to be a block element
export const TextFit = styled.div`
  /* stylelint-disable-next-line property-no-unknown */
  text-grow: per-line scale;
`;
