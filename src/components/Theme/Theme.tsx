import type { PropsWithChildren } from 'react';
import { ThemeProvider, type DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  primaryColor: 'oklch(0.961 0 0deg)',
  secondaryColor: 'oklch(0.798 0 0deg)',
  tertiaryColor: 'oklch(0.134 0 0deg)',
  highlightColor: 'oklch(0.672 0.255 352deg)',
} as const;

export type ThemeType = keyof typeof theme;

export const Theme = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
