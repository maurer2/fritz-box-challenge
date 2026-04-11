import { createTheme } from 'styled-components';

// https://github.com/styled-components/styled-components/blob/9e07d950eca4fd08c0be5240e1ecece60f86e94e/.changeset/feat-create-theme.md
export const theme = createTheme({
  colors: {
    primaryColor: 'oklch(0.961 0 0)',
    secondaryColor: 'oklch(0.798 0 0)',
    tertiaryColor: 'oklch(0.134 0 0)',
  },
});

export type Theme = typeof theme;
