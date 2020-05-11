import styled from 'styled-components/macro';

export const AppWrapper = styled.article`
  display: grid;
  grid-template-areas:
    "updateBar"
    "main"
    "navBar";
  grid-template-rows:
    auto
    1fr
    auto;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.tertiaryColor};
`;
