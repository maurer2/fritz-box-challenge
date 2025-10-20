import styled from 'styled-components';

type TextWrapperStyleProps = {
  $characterCount: number;
};

export const Wrapper = styled.dl`
  margin: 0;
  text-align: center;
  user-select: none;
`;

export const Title = styled.dt`
  margin-block-start: 0;
  margin-block-end: 2vh;
  color: ${({ theme }) => theme.primaryColor};
  font-size: 5vw;

  &:first-letter {
    text-transform: uppercase;
  }
`;

export const Value = styled.dd<TextWrapperStyleProps>`
  margin: 0;
  color: ${({ theme }) => theme.primaryColor};
  font-size: ${(props) => Math.floor((100 / props.$characterCount) * 1.35)}vw;
  font-weight: bold;
  line-height: 1;

  &:first-letter {
    text-transform: uppercase;
  }
`;
