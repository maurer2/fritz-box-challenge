import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components/macro';

export const theme = {
  primaryColor: '#F2F2F2',
  secondaryColor: '#BDBDBD',
  tertiaryColor: '#080808',
};

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

const { node } = PropTypes;

Theme.propTypes = {
  children: node.isRequired,
};
