import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { BoxDataContext } from '../DataProvider';

import * as Styles from './UpdateBar.styles';
import * as Types from './UpdateBar.types';

const UpdateBar: React.FC<Types.UpdateBarProps> = (): JSX.Element => {
  const state = React.useContext(BoxDataContext);
  console.log(state);

  const isUpdating = true;
  const isValid = true;

  return (
    <Styles.UpdateBar isUpdating={isUpdating}>
      {isUpdating ? (
        <Styles.Text>Updating!</Styles.Text>
      ) : (
        <Styles.Text>
          {!isValid && <>Error!</>}
          {!!isValid && <>Data loaded!</>}
        </Styles.Text>
      )}
    </Styles.UpdateBar>
  );
};

const { bool } = PropTypes;

UpdateBar.propTypes = {
  isUpdating: bool.isRequired,
  isValid: bool.isRequired,
};

export { UpdateBar };
