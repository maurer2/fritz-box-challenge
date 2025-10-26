import styled from 'styled-components';

export const SlideWrapper = styled.dl`
  margin: 0;
  user-select: none;
  color: ${({ theme }) => theme.primaryColor};
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
