import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import * as Types from './DataProvider.types';

const BoxDataContext = React.createContext({});

export const DataProvider: React.FC<Types.DataProviderProps> = ({ children }): JSX.Element => {
  const boxData = {
    name: 'mau',
  };

  return <BoxDataContext.Provider boxData={boxData}>{children}</BoxDataContext.Provider>;
};

const { node } = PropTypes;

DataProvider.propTypes = {
  children: node.isRequired,
};
