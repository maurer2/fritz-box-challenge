import type { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE, theme } from './tokens';

type ThemeProps = {
  children: ReactNode;
};

export const GlobalStyles = createGlobalStyle`
  @layer base {
    :root {
      /* not strictly necessary as @property's initial-value sets the default value */
      --is-single-row-nav: false;
      /* stylelint-disable-next-line media-query-no-invalid */
      @media (width > ${SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}px) {
        --is-single-row-nav: true;
      }

      --animation-duration: 0.5s;
      @media (prefers-reduced-motion: reduce) {
        --animation-duration: 0s;
      }

      /* obviated by the meta tag approach */
      --text-scale: env(preferred-text-scale, 1); /* Chrome testing: Rendering/Emulate OS text scale */

      /* custom media queries not supported anywhere */
      /* stylelint-disable-next-line media-query-no-invalid */
      /* @custom-media --large-screen (width > ${SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}px); */
    }

    /* non-vars stuff */
    :where(html) {
      -webkit-font-smoothing: antialiased;
      text-size-adjust: none;
      /* Disable default view transition and prevent fixed overlay blocking hover during transition: https://master.dev/blog/view-transitions-careful-not-to-make-stuff-unclickable/ */
      view-transition-name: none;
    }

    :where(body) {
      inline-size: 100dvi;
      block-size: 100dvb;
      overflow: clip;
      background: ${({ theme: currentTheme }) => currentTheme.colors.tertiaryColor}
    }

    :where(.root) {
      display: grid;
      grid-template-rows: [update-bar] 1fr [content] auto;
      block-size: 100%;
    }

    ::view-transition {
      pointer-events: none;
    }

    :active-view-transition-type(move-left) {
      &::view-transition-old(slide-master) {
        animation: var(--animation-duration) linear both slide-from-right reverse;
      }

      &::view-transition-new(slide-master) {
        animation: var(--animation-duration) linear both slide-from-left;
      }
    }

    :active-view-transition-type(move-right) {
      &::view-transition-old(slide-master) {
        animation: var(--animation-duration) linear both slide-from-left reverse;
      }

      &::view-transition-new(slide-master) {
        animation: var(--animation-duration) linear both slide-from-right;
      }
    }

    /* transitions between anchor-positions */
    ::view-transition-group(nav-indicator) {
      animation-duration: var(--animation-duration);
    }
  }

  /* necessary for the true/false check */
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
