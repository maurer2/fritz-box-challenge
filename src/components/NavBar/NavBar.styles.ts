import styled from 'styled-components';
import type { PropsWithChildren, ComponentProps } from 'react';
import { Link, type LinkProps } from '@tanstack/react-router';

export type NavBarEntryProps = ComponentProps<'a'> & LinkProps & PropsWithChildren;

export const NavBarWrapper = styled.nav`
  display: grid;
  grid-template-rows: 5px auto;
`;

export const NavBarList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: stretch;
  background: ${({ theme }) => theme.secondaryColor};
  contain: layout style paint;
  list-style: none;

  > li {
    display: contents;
  }
`;

export const NavBarIndicatorWrapper = styled.div`
  position: relative;
  container-type: inline-size;
`;

export const NavBarIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  inline-size: var(--inline-size, 'auto');
  inset-block: 0;
  translate: var(--offset-x, 0px);
  transition-property: none; // fallback for browsers that do not support style queries
  transition-duration: 0;
  background: ${({ theme }) => theme.primaryColor};

  @container style(--has-prev-offset: true) {
    transition-property: translate, inline-size;
  }
  @media (prefers-reduced-motion: no-preference) {
    transition-duration: 500ms;
  }
`;

export const NavBarEntry = styled(Link)<NavBarEntryProps>`
  padding-block: 1rem;
  padding-inline: 3rem;
  flex: 1;
  border: 0;
  color: ${({ theme }) => theme.tertiaryColor};
  font-weight: bold;
  background: none;
  text-decoration: none;
  text-align: center;

  &:where(:hover, :focus-visible) {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 6px;
  }

  &:focus-visible {
    // https://www.w3.org/WAI/WCAG21/Techniques/css/C40
    /* inner indicator */
    outline: 2px #f9f9f9 solid;
    outline-offset: 0;
    /* outer indicator */
    box-shadow: 0 0 0 4px #193146;
  }
`;
