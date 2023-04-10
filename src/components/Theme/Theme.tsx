import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components/macro';

import * as Types from './Theme.types';

export const theme = {
  primaryColor: '#F2F2F2',
  secondaryColor: '#BDBDBD',
  tertiaryColor: '#080808',
};

export const Theme: FC<Types.SlideProps> = ({ children }): JSX.Element => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
