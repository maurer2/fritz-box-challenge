import styled from 'styled-components/macro';

export const NavBarEntryWrapper = styled.li`
  flex: 1 0 ${(props) => (props.isFullWidth ? '33%' : '0')};
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
  color: ${({ theme }) => theme.tertiaryColor};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  transition: color 500ms;
`;
