import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import * as Types from './DataProvider.types';

const BoxDataContext = React.createContext({});

const DataProvider: React.FC<Types.DataProviderProps> = ({ children }): JSX.Element => {
  const boxData: Types.BoxData = {
    branding: 'branding',
    firmware: 'firmware',
    model: 'model',
    restarts: 'restarts',
    technology: 'technology',
    runtime: 'runtime',
    age: 'age',
  };

  return <BoxDataContext.Provider boxData={boxData}>{children}</BoxDataContext.Provider>;
};

const { node } = PropTypes;

DataProvider.propTypes = {
  children: node.isRequired,
};

export { DataProvider };
