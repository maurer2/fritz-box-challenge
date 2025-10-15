import type { PropsWithChildren } from 'react';
import React from 'react';
import { ThemeProvider, type DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  primaryColor: '#F2F2F2',
  secondaryColor: '#BDBDBD',
  tertiaryColor: '#080808',
} as const;

export type ThemeType = keyof typeof theme;

export const Theme = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
