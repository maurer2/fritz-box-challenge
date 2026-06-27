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

      /* not striclty neccessary as @property's inital-value sets the default value */
      --is-single-row-nav: false;

      /* stylelint-disable-next-line media-query-no-invalid */
      @media (width > ${SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}px) {
        --is-single-row-nav: true;
      }

      /* custom media queries not supported anywhere */
      /* stylelint-disable-next-line media-query-no-invalid */
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

  /* neccessary for the true/false check */
  @property --is-single-row-nav {
    syntax: "<custom-ident>";
    inherits: true;
    initial-value: false;
  }

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

  /* tailwind */
  @keyframes pulse {
    50% {
      opacity: 0.5;
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
