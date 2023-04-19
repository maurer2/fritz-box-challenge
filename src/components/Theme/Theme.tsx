// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components/macro';

export const theme = {
  primaryColor: '#F2F2F2',
  secondaryColor: '#BDBDBD',
  tertiaryColor: '#080808',
} as const;

export type ThemeType = keyof typeof theme;

export const Theme: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
