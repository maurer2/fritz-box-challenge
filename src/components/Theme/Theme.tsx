import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components/macro';

// import * as Types from './Theme.types';

export const theme = {
  primaryColor: '#F2F2F2',
  secondaryColor: '#BDBDBD',
  tertiaryColor: '#080808',
};

export const Theme: React.FC<{}> = ({ children }): JSX.Element => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const { node } = PropTypes;

Theme.propTypes = {
  children: node.isRequired,
};
