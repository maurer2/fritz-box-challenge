import { createTheme, createGlobalStyle } from 'styled-components';

// https://github.com/styled-components/styled-components/blob/9e07d950eca4fd08c0be5240e1ecece60f86e94e/.changeset/feat-create-theme.md
const defaultTheme = createTheme({
  colors: {
    primaryColor: 'oklch(0.961 0 0)',
    secondaryColor: 'oklch(0.798 0 0)',
    tertiaryColor: 'oklch(0.1448 0 0)',
  },
});
export { defaultTheme as theme };

export const GlobalStyles = createGlobalStyle`
  @layer base {
    :root {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
    }

    body {
      inline-size: 100dvi;
      block-size: 100dvb;
      overflow: clip;
      background: ${({ theme }) => theme.colors.tertiaryColor}
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

export type Theme = typeof defaultTheme;
