import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  user-select: none;
  text-align: center;
  will-change: transform;
`;

export const TitleWrapper = styled.h2`
  margin-top: 0;
  margin-bottom: 2vh;
  font-size: 5vw;
  color: ${({ theme }) => theme.primaryColor};
`;

export const TextWrapper = styled.div`
  margin: 0;
  font-size: ${(props) => Math.floor((100 / props.characterCount) * 1.35)}vw;
  line-height: 1;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor};
`;
