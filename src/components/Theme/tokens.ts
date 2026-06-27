import { createTheme } from 'styled-components';

export const SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE = 750;

export const theme = createTheme({
  colors: {
    primaryColor: 'oklch(0.961 0 0)',
    secondaryColor: 'oklch(0.798 0 0)',
    tertiaryColor: 'oklch(0.1448 0 0)',
    highlightColor: 'oklch(0.672 0.255 352deg)',
  },
});

export type Theme = typeof theme;
