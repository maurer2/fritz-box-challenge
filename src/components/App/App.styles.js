import styled from 'styled-components/macro';

export const AppWrapper = styled.article`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "main"
    "navBar"
  ;
  grid-template-rows:
    1fr
    auto
  ;
  grid-template-columns: 1fr;

  ${({ isUpdating }) => isUpdating && `
    grid-template-areas:
      "updateBar"
      "main"
      "navBar"
    ;
    grid-template-rows:
      auto
      1fr
      auto
    ;
  `}
  background: #080808;
`;
