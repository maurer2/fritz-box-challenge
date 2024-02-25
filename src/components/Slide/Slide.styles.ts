import styled from 'styled-components';

import { TextWrapperStyleProps } from './Slide.types';

export const Wrapper = styled.div`
  text-align: center;
  user-select: none;
  will-change: transform;
`;

export const TitleWrapper = styled.h2`
  margin-top: 0;
  margin-bottom: 2vh;
  color: ${({ theme }) => theme.primaryColor};
  font-size: 5vw;
`;

export const TextWrapper = styled.div<TextWrapperStyleProps>`
  margin: 0;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: bold;
  font-size: ${(props) => Math.floor((100 / props.$characterCount) * 1.35)}vw;
  line-height: 1;
`;
