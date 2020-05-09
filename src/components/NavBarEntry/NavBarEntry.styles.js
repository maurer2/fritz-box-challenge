import styled from 'styled-components/macro';

export const NavBarEntryWrapper = styled.li`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${(props) => (props.isFullWidth ? '33%' : '0')};
`;

export const defaultButton = styled.button`
  padding: 1rem;
  appearance: none;
  background: none;
  outline: none;
`;

export const NavBarButton = styled(defaultButton)`
  display: block;
  width: 100%;
  border: 0;
  font-size: 1rem;
  color: ${(props) => (props.isActive ? '#080808' : '#121212')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  transition: color 500ms;
`;
