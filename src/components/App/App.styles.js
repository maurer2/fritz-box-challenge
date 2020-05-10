import styled from 'styled-components/macro';

export const AppWrapper = styled.article`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "updateBar"
    "main"
    "navBar"
  ;
  grid-template-rows:
    50px
    1fr
    50px
  ;
  grid-template-columns: 1fr;
  background: #080808;
`;
