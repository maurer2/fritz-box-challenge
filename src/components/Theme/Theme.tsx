import type { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE, theme } from './tokens';

type ThemeProps = {
  children: ReactNode;
};

export const GlobalStyles = createGlobalStyle`
  @layer base {
    :root {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;

      /*
      --indicator-is-visible: false;
      @media (width > ${SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}px) {
        --indicator-is-visible: true;
      } */

      /* @custom-media --large-screen (width > ${SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}px); */
    }

    body {
      inline-size: 100dvi;
      block-size: 100dvb;
      overflow: clip;
      background: ${({ theme: currentTheme }) => currentTheme.colors.tertiaryColor}
    }

    .root {
      display: grid;
      grid-template-rows: [update-bar] 1fr [content] auto;
      block-size: 100%;
    }

    html:active-view-transition-type(move-left) {
      &::view-transition-old(slide-master) {
        animation: 0.5s linear both slide-from-right reverse;
      }

      &::view-transition-new(slide-master) {
        animation: 0.5s linear both slide-from-left;
      }
    }

    html:active-view-transition-type(move-right) {
      &::view-transition-old(slide-master) {
        animation: 0.5s linear both slide-from-left reverse;
      }

      &::view-transition-new(slide-master) {
        animation: 0.5s linear both slide-from-right;
      }
    }
  }

  /*
  @property --indicator-is-visible {
    syntax: "<custom-ident>";
    inherits: true;
    initial-value: false;
  }
  */

  @keyframes slide-from-left {
    from {
      opacity: 0.01;
      translate: -100%;
    }

    to {
      opacity: 1;
      translate: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      opacity: 0.01;
      translate: 100%;
    }

    to {
      opacity: 1;
      translate: 0;
    }
  }
`;

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider theme={theme}>
    {/* CSS Vars */}
    <theme.GlobalStyle />
    {/* Base styles */}
    <GlobalStyles />
    {children}
  </ThemeProvider>
);
